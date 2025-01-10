const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Route for getting orders (protected)
router.get('/', authMiddleware.verifyToken, orderController.getAllOrders);

// Route for creating new orders (protected)
router.post('/', authMiddleware.verifyToken, orderController.createOrder);

module.exports = router;