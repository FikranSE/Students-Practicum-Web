const db = require('../models'); // Adjust the path as necessary

exports.createMeeting = async (req, res) => {
  const { title, classId } = req.body;

  try {
    const meeting = await db.Meeting.create({
      title,
      classId
    });

    res.redirect(`/dashboard/${classId}`); // Redirect to the class dashboard after creating the meeting
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).send('Server Error');
  }
};

