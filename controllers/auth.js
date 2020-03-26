const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
    
    User.isExisting(email)
    .then(isExisting => {
        if(!isExisting){

            return bcrypt.hash(password,8)
            .then(hashedPassword => {
                // adding new user to 'users' collection
                const user = new User(email, organisation,hashedPassword);
                user.save()
                .then(result => {
                    console.log(" -----Added New User------");
                    res.send(user.email + " added");
                })
                .catch(err => {
                    console.log(">>>>>>>> AADING NEW USER FAILED<<<<<<<<<");
                });

            })
            .catch(err=>{
                console.log(" ERROR : COULD NOT ENCRYPT PASSWORD");
                console.log(err);
            });
           

      }
      else{
            res.send(">>>>>>>>user already exist<<<<<<<<<<<");
      }
    
    })
    .catch(err=>{
        console.log("Error----failed to check if the email exisi");
    });

    

}
exports.userLogin = (req,res,next) => {
    req.session.isLoggedIn = true;
    res.redirect('/dashboard');  
}