const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.get('/register', userController.regisForm);
router.post('/register', userController.register);
router.get('/logout', userController.logout);
router.get('/profile', userController.profile);

module.exports = router;
