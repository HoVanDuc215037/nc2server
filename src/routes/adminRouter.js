const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();
router.post('/account', adminController.createANewAccount);
router.delete('/account', adminController.deleteAnAccount);
router.get('/get-all-accounts', adminController.getAllAccounts);
router.put('/update-an-account', adminController.updateAnAccounts);

module.exports = router;