const db = require('../models'); 
const { format } = require('date-fns');




exports.addTugas = async (req, res) => {
  const { title, instruksi, meetingId, classId, due } = req.body;

  try {
    // Buat record tugas baru di database
    const assignment = await db.Assignment.create({
      title,
      instructions: instruksi,
      meetingId,
      classId,
      due: new Date(due) // Ubah nilai due menjadi objek Date sebelum disimpan
    });

    // Redirect kembali ke dashboard atau halaman yang sesuai
    res.redirect(`/dashboard/${classId}`);
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).send('Server Error');
  }
};


exports.detailAssignment = async (req, res) => {
  const { id, classId } = req.params;
  const userId = req.session.user.id;
  const userName = req.session.user.name;
  const userRole = req.session.user.role;
  try {
    // Find the assignment by ID and classId
    const assignment = await db.Assignment.findOne({
      where: {
        id,
        classId
      } 
    });

    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }

    // Find the submission by assignmentId and userId
    const submission = await db.Submission.findOne({
      where: {
        assignmentId: id,
        userId
      }
    });

    // Find the class by classId
    const kelas = await db.Class.findByPk(classId);

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    // Format the due date using date-fns
    const formattedDue = format(new Date(assignment.due), 'dd MMM, HH.mm');
    const duePassed = new Date() > new Date(assignment.due);
    // Render the detail assignment page with assignment, class, formatted due date, and submission
    res.render('user/detailAssignment', { assignment, kelas, formattedDue, submission, duePassed, userName, userRole });
  } catch (error) {
    console.error('Error fetching assignment or class:', error);
    res.status(500).send('Server Error');
  }
};



exports.allAssignment = async (req, res) => {
  const { assignmentId, classId, meetingId } = req.params;
  const userName = req.session.user.name;
  const userRole = req.session.user.role;
  try {
    const assignment = await db.Assignment.findByPk(assignmentId);

    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }

    const formattedDue = format(new Date(assignment.due), 'dd MMM, HH.mm'); // Format the due date

    // Fetch the class data based on classId
    const kelas = await db.Class.findByPk(classId);

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    // Fetch the meeting data based on meetingId
    const meeting = await db.Meeting.findByPk(meetingId);

    if (!meeting) {
      return res.status(404).send('Meeting not found');
    }

    const submissions = await db.Submission.findAll({
      where: { assignmentId },
      include: [{ model: db.User, attributes: ['id', 'name'] }],
    });

    res.render('user/allAssignment', { userRole, assignment, submissions, kelas, formattedDue, classId, meeting, meetingId, userName });
  } catch (error) {
    console.error('Error fetching assignment or submissions:', error);
    res.status(500).send('Server Error');
  }
};









exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    // Temukan modul berdasarkan ID
    const assignment = await db.Assignment.findByPk(id);

    if (!assignment) {
      return res.status(404).send('assignment not found');
    }

    // Hapus modul dari database
    await assignment.destroy();

    // Redirect kembali ke dashboard atau halaman yang sesuai
    res.redirect(`/dashboard/${assignment.classId}`);
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).send('Server Error');
  }
};




