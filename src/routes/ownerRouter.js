const express = require('express');
const ownerController = require('../controllers/ownerController');

const router = express.Router();

router.post('/restaurant', ownerController.createRestaurant);
router.put('/restaurant', ownerController.udpateRestaurant);
router.get('/restaurant', ownerController.getRestaurant);
router.post('/map', ownerController.updateMap);
router.post('/account', ownerController.createANewAccount);
router.delete('/account', ownerController.deleteAnAccount);
router.get('/get-all-accounts-created-by-owner', ownerController.getAccountCreatedByAOwner);
router.get('/statistics', ownerController.getStatistics);

module.exports = router;