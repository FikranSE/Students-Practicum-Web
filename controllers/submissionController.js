const db = require('../models'); 
const { format } = require('date-fns');


exports.submitAssignment = async (req, res) => {
  const { assignmentId, classId } = req.body;
  const userId = req.session.user.id; // Assuming userId is available in req.user after authentication

  try {
    // Temukan assignment berdasarkan ID
    const assignment = await db.Assignment.findByPk(assignmentId);

    if (!assignment) {
      return res.status(404).send('Assignment not found');
    } 

    // Temukan kelas berdasarkan classId
    const kelas = await db.Class.findByPk(classId);

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    // Simpan file yang diunggah
    if (req.file) {
      const filename = req.file.filename;

      // Buat record Submission baru di database
      const submission = await db.Submission.create({
        userId: userId,
        classId: classId,
        meetingId: assignment.meetingId,
        assignmentId: assignmentId,
        uploadedFile: filename
      });

      // Redirect kembali ke halaman detail assignment atau halaman yang sesuai
      res.redirect(`/detail-assignment/${assignmentId}/${classId}/${userId}`);
    } else {
      return res.status(400).send('No file uploaded');
    }
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).send('Server Error');
  }
};


exports.deleteSubmission = async (req, res) => {
  const { id, classId } = req.params;
  const userId = req.session.user.id;

  try {
    // Temukan submission berdasarkan ID
    const submission = await db.Submission.findByPk(id);

    if (!submission) {
      return res.status(404).send('Submission not found');
    }

    // Hapus submission
    await submission.destroy();

    // Redirect kembali ke halaman detail assignment atau halaman yang sesuai
    res.redirect(`/detail-assignment/${submission.assignmentId}/${classId}/${userId}`);
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).send('Server Error');
  }
}; 


