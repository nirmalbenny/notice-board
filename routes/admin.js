const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/dashboard',adminController.adminDashBoard);
router.get('/login',adminController.adminLogin);

module.exports = router;