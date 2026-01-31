const express = require('express');
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/restaurant', ownerController.createRestaurant);
router.put('/restaurant', ownerController.udpateRestaurant);
router.get('/restaurant', ownerController.getRestaurant);
router.post('/map', ownerController.updateMap);
router.post('/account', ownerController.createAccount);
router.delete('/account', ownerController.deleteAccount);
router.get('/accounts', ownerController.getAccountCreatedByAOwner);
router.get('/statistics', ownerController.getStatistics);

module.exports = router;