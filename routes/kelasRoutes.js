const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelasController');
const ensureAuthenticated = require('../middlewares/authMiddleware')


router.get('/home', ensureAuthenticated,kelasController.home);
router.get('/enrollment', ensureAuthenticated,kelasController.enrollment);
router.get('/jadwalPraktikum', ensureAuthenticated,kelasController.jadwalPraktikum);
router.get('/dashboard/:id', ensureAuthenticated,kelasController.dashboard);
router.get('/jadwalPraktikum/:classId', kelasController.jadwalPraktikum);
router.get('/showReference/:classId', kelasController.showReference);
router.post('/createClass', kelasController.createClass);
router.post('/enroll', kelasController.enroll);
router.post('/addJadwalPraktikum', kelasController.addJadwalPraktikum);
router.post('/tambahReference', kelasController.tambahReference);
router.get('/deleteReference/:referenceId', kelasController.deleteReference);
router.get('/absensi/:classId', kelasController.absensi);
router.post('/simpan-absensi', kelasController.simpanAbsensi);


module.exports = router; 
