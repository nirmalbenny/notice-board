const User = require('../models/user');

exports.showHomePage = (req,res,next)=>{
    res.render('index',{
        isAuthenticated : false
    });
}

exports.showUserBoard = (req, res, next) => {
    res.send(" User Board name : "+req.params.boardName);
}
exports.userDashboard = (req,res,next) => {
    res.render("userDashboard",{
        isAuthenticated : false
    });
}