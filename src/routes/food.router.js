const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verifyToken, foodController.createFood);
router.get('/', foodController.getAllFoods);
router.get('/:id', foodController.getFoodById);
router.put('/:id', authMiddleware.verifyToken, foodController.updateFood);
router.delete('/:id', authMiddleware.verifyToken, foodController.deleteFood);

module.exports = router;