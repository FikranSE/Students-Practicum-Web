const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const ensureAuthenticated = require('../middlewares/authMiddleware')
const multer = require('multer');
// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Tentukan folder tujuan untuk file yang diunggah
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Definisikan konvensi penamaan file
  }
});
const upload = multer({ storage });

router.post('/submit-assignment', upload.single('submittedFile'), submissionController.submitAssignment);
router.get('/delete-submit/:id/:classId', submissionController.deleteSubmission);

module.exports = router;