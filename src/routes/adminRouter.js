const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();
router.get('/', adminController.getAllAccounts);
router.get('/account', adminController.getAccountByEmail);
router.post('/account', adminController.createAccount);
router.post('/account/delete', adminController.deleteAccount);
router.get('/accounts', adminController.getAllAccounts);
router.put('/account', adminController.updateAccounts);

module.exports = router;