const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
router.get('/dashboard',userController.userDashboard);
router.get('/boards/:boardName',userController.showUserBoard);
router.post('/check-url',userController.checkUrl);

router.get('/',userController.showHomePage);



module.exports = router; 