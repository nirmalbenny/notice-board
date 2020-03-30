const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
router.post('/delete-nb',userController.deleteNB);
router.get('/dashboard-list',userController.getListPage);
router.get('/dashboard',userController.userDashboard);
router.get('/boards/:boardName',userController.showUserBoard);
router.post('/check-url',userController.checkUrl);
router.post('/add-noticeboard',userController.postAddNoticeBoard);
router.get('/fetch-nb-list',userController.getNBList);
router.get('/',userController.showHomePage);



module.exports = router; 