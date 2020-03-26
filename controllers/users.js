const User = require('../models/user');

exports.showHomePage = (req,res,next)=>{
    res.render('index',{
        isAuthenticated : false
    });
}

exports.showUserBoard = (req, res, next) => {
    res.send(" User Board name : "+req.params.boardName);
}
exports.showLoginPage = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render("login"); 
}
exports.showSignupPage = (req, res, next) => {
    res.render("register");
}
exports.registerUser = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const organisation = req.body.organisation;

    const user = new User(email, password, organisation);
    user.save()
    .then(result => {
        console.log(" -----Added New User------");
        res.send(user.email + " added");
    })
    .catch(err => {
        console.log(err);
    });

}
exports.userLogin = (req,res,next) => {
    req.session.isLoggedIn = true;
    res.redirect('/dashboard');  
}
exports.userDashboard = (req,res,next) => {
    res.render("userDashboard",{
        isAuthenticated : false
    });
}