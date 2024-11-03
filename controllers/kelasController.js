const db = require('../models');

exports.home = async (req, res) => {
  try {
    const userId = req.session.user.id; // Assuming you store the user object in session
    const userRole = req.session.user.role;
    const userName = req.session.user.name;

    let kelasList = [];
    if (userRole === 'aslab') {
      // Fetch all classes for the aslab user
      kelasList = await db.Class.findAll();
    } else {
      // Fetch all enrollments for the logged-in user
      const enrollments = await db.Enrollment.findAll({
        where: { userId },
        include: db.Class
      });

      // Extract the classes from the enrollments
      kelasList = enrollments.map(enrollment => enrollment.Class);
    }

    // Render the 'home' page and pass the class data and user role to the view
    res.render('user/home', { kelasList, userRole, userName });
  } catch (error) {
    console.error('Error fetching class data:', error);
    res.status(500).send('Server Error');
  }
};



exports.enrollment = async (req, res) => {
  const userName = req.session.user.name;
  const userRole = req.session.user.role;
  res.render('user/enrollment', {userName, userRole});
};

exports.enroll = async (req, res) => {
  const { enrollKey } = req.body;
  const userId = req.session.user.id; // Assuming you store the user object in session

  try {
    // Find the class using the enrollKey
    const kelas = await db.Class.findOne({ where: { enrollKey } });

    if (!kelas) {
      return res.status(400).send('Class not found');
    }

    // Create an enrollment with the classId and userId
    const enrollment = await db.Enrollment.create({
      enrollKey,
      userId,
      classId: kelas.id
    });

    res.redirect('/home'); // Redirect to a relevant page after enrollment
  } catch (error) {
    console.error(error);
    res.status(400).send('Enrollment failed');
  }
};


exports.dashboard = async (req, res) => {
  const classId = req.params.id;
  const userRole = req.session.user.role;
  const user = req.session.user;
  const userName = req.session.user.name;

  try {
    // Fetch the class details along with related meetings, modules, assignments, submissions, and responses
    const kelas = await db.Class.findOne({
      where: { id: classId },
      include: [
        {
          model: db.Meeting,
          order: [['id', 'ASC']], // Ensure meetings are fetched in ascending order
          include: [
            { model: db.Module },
            {
              model: db.Assignment,
              include: [
                {
                  model: db.Submission,
                  include: [{ model: db.User, attributes: ['id', 'name'] }] // Include the user who submitted the assignment
                }
              ]
            },
            {
              model: db.Response // Include the responses related to the meeting
            }
          ]
        }
      ]
    });

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    // Render the 'dashboard' page and pass the class data and responses to the view
    res.render('user/dashboard', { kelas, userRole, user, userName });
  } catch (error) {
    console.error('Error fetching class data:', error);
    res.status(500).send('Server Error');
  }
};






exports.createClass = async (req, res) => {
  const { name, enrollKey, year } = req.body;
  try {
    // Check if the enrollment key already exists
    const existingClass = await db.Class.findOne({ where: { enrollKey } });
    if (existingClass) {
      return res.status(400).send('Enroll Key already exists');
    }

    // Create the class
    const newClass = await db.Class.create({ name, enrollKey, year });
    console.log(newClass);
    res.redirect('/home');// Send back the created class as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.jadwalPraktikum = async (req, res) => {
  const { classId } = req.params;
  const userRole = req.session.user.role;  // Assuming req.user.role contains the user's role
  const userName = req.session.user.name;
  try {
    const kelas = await db.Class.findByPk(classId);
    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    const schedules = await db.JadwalPraktikum.findAll({
      where: { classId },
      include: [{ model: db.Class, attributes: ['name'] }],
    });

    // Convert time to proper format
    const formattedSchedules = schedules.map(schedule => ({
      ...schedule.get(),
      formattedTime: new Date(`1970-01-01T${schedule.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    res.render('user/jadwalPraktikum', {
      schedules: formattedSchedules,
      kelas,
      userRole,
      userName
    });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).send('Server Error');
  }
};



exports.addJadwalPraktikum = async (req, res) => {
  const { name, time, day, classId } = req.body;

  try {
    const jadwalPraktikum = await db.JadwalPraktikum.create({
      aslabName: name,
      time: time,
      day: day,
      classId: classId,
    });

    res.redirect(`/jadwalPraktikum/${classId}`);
  } catch (error) {
    console.error('Error adding Jadwal Praktikum:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};



exports.showReference = async (req, res) => {
  try {
    const classId = req.params.classId;
    const userRole = req.session.user.role;
    const userName = req.session.user.name;
    const kelas = await db.Class.findByPk(classId, {
      include: [
        { 
          model: db.Reference,
          as: 'references', // Alias yang sama dengan yang didefinisikan dalam asosiasi
          where: { classId: classId },
          required: false // Gunakan ini jika kelas mungkin tidak memiliki referensi
        }
      ]
    });

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    res.render('user/reference', { kelas, userName, userRole, references: kelas.references });
  } catch (error) {
    console.error('Error fetching class data:', error);
    res.status(500).send('Server error');
  }
};





exports.tambahReference = async (req, res) => {
  try {
    const { title, description, classId } = req.body;

    // Validasi input
    if (!title || !description || !classId) {
      return res.status(400).send('All fields are required');
    }

    // Simpan referensi baru ke database
    const newReference = await db.Reference.create({
      title,
      description,
      classId
    });

    res.redirect(`/showReference/${classId}`);
  } catch (error) {
    console.error('Error adding new reference:', error);
    res.status(500).send('Server error');
  }
};



exports.deleteReference = async (req, res) => {
  try {
    const referenceId = req.params.referenceId;
    
    // Hapus referensi berdasarkan referenceId
    const reference = await db.Reference.findByPk(referenceId);
    
    if (!reference) {
      return res.status(404).send('Reference not found');
    }
    
    await reference.destroy();
    
    // Redirect kembali ke halaman referensi atau halaman yang sesuai
    res.redirect('back');
  } catch (error) {
    console.error('Error deleting reference:', error);
    res.status(500).send('Server error');
  }
};


exports.absensi = async (req, res) => {
  try {
    const classId = req.params.classId;
    const kelas = await db.Class.findByPk(classId);
    const userName = req.session.user.name;
    const userRole = req.session.user.role;

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    // Get all enrollments with the same enrollKey as the class
    const enrollments = await db.Enrollment.findAll({
      where: { enrollKey: kelas.enrollKey }
    });

    // Get all userIds from the enrollments
    const userIds = enrollments.map(enrollment => enrollment.userId);

    // Get all users with the userIds from the enrollments
    const users = await db.User.findAll({
      where: { id: userIds } // Change 'userId' to 'id' if 'id' is used in the Users table
    });

    res.render('user/absensi', { kelas, users, userName, userRole });
  } catch (error) {
    console.error('Error fetching class data:', error);
    res.status(500).send('Server error');
  }
};

exports.simpanAbsensi = async (req, res) => {
  try {
    const { tanggal_absen, kehadiran, classId } = req.body;

    // Extract userIds from the kehadiran object keys
    const userIds = Object.keys(kehadiran);

    for (const userId of userIds) {
      // Check if the userId exists in the Users table
      const user = await db.User.findByPk(userId);
      if (user) {
        console.log(`Saving attendance for userId: ${userId}, kehadiran: ${kehadiran[userId]}`);
        await db.Absensi.create({
          tanggal_absen,
          kehadiran: kehadiran[userId], // Assuming kehadiran is an object with userId as keys
          classId,
          userId
        });
      } else {
        console.error(`User with id ${userId} does not exist.`);
      }
    }

    res.redirect(`/absensi/${classId}`);
  } catch (error) {
    console.error('Error saving attendance data:', error);
    res.status(500).send('Server error');
  }
};






