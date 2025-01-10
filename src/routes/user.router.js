// File: routes/authRoutes.js

const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Route for login
router.post('/login', userController.login);

// Route for verifying token
router.get('/verify', authMiddleware.verifyToken);

module.exports = router;