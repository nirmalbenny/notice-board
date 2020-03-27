const User = require('../models/user');

exports.showHomePage = (req,res,next)=>{
  
    res.render('index',{
        isAuthenticated : req.session.isLoggedIn ? true : false
    });
}

exports.showUserBoard = (req, res, next) => {
    res.send(" User Board name : "+req.params.boardName);
}
exports.userDashboard = (req,res,next) => {
    if(!req.session.isLoggedIn)
    {
       return res.redirect('/login');
    }
   
    return res.render("userDashboard",{
        isAuthenticated : true,
        route : req.url
    });
}