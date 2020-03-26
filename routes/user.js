const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/login',userController.showLoginPage);
router.post('/login',userController.userLogin);
router.get('/register',userController.showSignupPage);
router.post('/register',userController.registerUser);
router.get('/dashboard',userController.userDashboard);
router.get('/boards/:boardName',userController.showUserBoard);


router.get('/',userController.showHomePage);


module.exports = router; 