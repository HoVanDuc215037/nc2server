const express = require('express');
const router = express.Router();
const productionController = require('../controllers/productionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', productionController.createProduction);
router.get('/', productionController.getAllProductions);
router.get('/email', productionController.getProductionByCreatedEmail);
router.get('/byid', productionController.getProductionById);
router.put('/update', productionController.updateProduction);
router.post('/delete', productionController.deleteProduction);
router.get('/tags', productionController.getProductionTags);

module.exports = router;