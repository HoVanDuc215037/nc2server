const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/sign-in', userController.signIn);
router.post('/sign-up', userController.signUp);
router.post('/update-profile', userController.updateProfile);
router.get('/detail', userController.getAccountInformation);
router.get('/profile', userController.getProfile);
router.post('/profile', userController.updateProfile);
router.get('/account/check', userController.checkExistAccount);

router.get('/hash', userController.getHashedText);

module.exports = router;