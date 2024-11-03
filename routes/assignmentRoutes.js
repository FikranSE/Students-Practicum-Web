const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const ensureAuthenticated = require('../middlewares/authMiddleware');


router.post('/addTugas', assignmentController.addTugas);
router.post('/addTugas', assignmentController.addTugas);
router.get('/delete-assignment/:id', assignmentController.deleteAssignment);
router.get('/detail-assignment/:id/:classId/:userId', assignmentController.detailAssignment);
router.get('/all-assignment/:assignmentId/:classId/:meetingId', assignmentController.allAssignment);




module.exports = router;
