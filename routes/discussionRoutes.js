const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

// Menampilkan halaman forum diskusi
router.get('/forumDiskusi/:classId', discussionController.showDiscussionForum);

// Menambahkan pesan baru ke forum diskusi
router.post('/postDiscussion', discussionController.addDiscussionMessage);

module.exports = router;
 