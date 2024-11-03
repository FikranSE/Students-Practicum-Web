const db = require('../models'); 

exports.showDiscussionForum = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userName = req.session.user.name;
    const userRole = req.session.user.role;
    // Fetch the current user's information
    const currentUser = await db.User.findOne({ where: { id: userId } });

    // Fetch discussion data based on classId
    const discussions = await db.Discussion.findAll({
      where: { classId: req.params.classId },
      include: [{ model: db.User }]
    });

    // Fetch class data based on classId
    const kelas = await db.Class.findOne({ where: { id: req.params.classId } });

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    res.render('user/forumDiskusi', { discussions, currentUser, kelas, userName, userRole });
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).send('Server Error');
  }
};



 
// Controller untuk menambahkan pesan baru ke forum diskusi
exports.addDiscussionMessage = async (req, res) => {
  try {
    const { content,classId } = req.body;
    const userId = req.session.user.id;

    // Tambahkan pesan baru ke database
    await db.Discussion.create({ content, userId, classId });

    res.redirect(`/forumDiskusi/${classId}`);
  } catch (error) {
    console.error('Error adding discussion message:', error);
    res.status(500).send('Server Error');
  }
};
 