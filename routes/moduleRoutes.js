const express = require('express');
const multer = require('multer');
const router = express.Router();
const moduleController = require('../controllers/moduleController');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Define the file naming convention
  }
});
const upload = multer({ storage });

// Add the upload middleware to the route where file upload is expected
router.post('/addModul', upload.single('filePath'), moduleController.addModul);
router.get('/delete-module/:id', moduleController.deleteModul);

module.exports = router;