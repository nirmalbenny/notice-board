const express = require('express');
const router = express.Router();
 
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

router.get('/login',authController.showLoginPage);
router.post('/login',authController.userLogin);
router.get('/register',authController.showSignupPage);
router.post('/register',authController.registerUser);
 


router.get('/',userController.showHomePage);


module.exports = router; 