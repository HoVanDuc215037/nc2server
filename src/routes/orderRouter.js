const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/done', orderController.getDoneOrders);
router.get('/pending', orderController.getPendingOrders);
router.post('/', orderController.createOrder);
router.post('/update', orderController.updateOrder);


module.exports = router;