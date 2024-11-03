const db = require('../models'); // Adjust the path as necessary


exports.addModul = async (req, res) => {
  const { meetingId, classId } = req.body;

  try {
    let filePath = null;
    if (req.file) {
      filePath = req.file.path; // Get the path of the uploaded file
    }

    // Create a new module record in the database
    const module = await db.Module.create({
      filePath,
      meetingId,
      classId
    });

    // Redirect back to the dashboard or wherever appropriate
    res.redirect(`/dashboard/${classId}`);
  } catch (error) {
    console.error('Error adding module:', error);
    res.status(500).send('Server Error');
  }
};

exports.deleteModul = async (req, res) => {
  const { id } = req.params;

  try {
    // Temukan modul berdasarkan ID
    const module = await db.Module.findByPk(id);

    if (!module) {
      return res.status(404).send('Module not found');
    }

    // Hapus modul dari database
    await module.destroy();

    // Redirect kembali ke dashboard atau halaman yang sesuai
    res.redirect(`/dashboard/${module.classId}`);
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).send('Server Error');
  }
};
