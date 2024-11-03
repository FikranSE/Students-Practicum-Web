const express = require('express');
const router = express.Router();
const responsiController = require('../controllers/responsiController');
const ensureAuthenticated = require('../middlewares/authMiddleware')


router.get('/detailResponsi/:classId/:meetingId/:responseId', ensureAuthenticated,responsiController.detailResponsi);
router.get('/deleteResponsiQuestion/:id', ensureAuthenticated,responsiController.deleteResponsiQuestion);
router.get('/deleteResponsi/:responseId', ensureAuthenticated,responsiController.deleteResponsi);
router.post('/addResponsi', responsiController.addResponsi);
router.post('/submitAnswer/:responseId/:classId/:meetingId', responsiController.submitAnswer);
router.post('/addResponsiQuestion', responsiController.addResponsiQuestion);
router.post('/delete-submitResponsi/:answerId', responsiController.deleteSubmitResponsi);


module.exports = router;
