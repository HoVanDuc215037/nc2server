const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/sign-up', userController.signup);
router.get('/verify-token', userController.verifyToken);
router.put('/update-profile', userController.updateProfile);
router.get('/detail', userController.getAccountInformation);
router.get('/profile', userController.getProfile);
router.post('/profile', userController.updateProfile);

module.exports = router;