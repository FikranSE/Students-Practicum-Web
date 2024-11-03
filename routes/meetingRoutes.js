const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const ensureAuthenticated = require('../middlewares/authMiddleware')


router.post('/createMeeting', meetingController.createMeeting);
router.post('/createMeetingResponse', meetingController.createMeeting);

module.exports = router;
