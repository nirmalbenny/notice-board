const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.showLoginPage = (req, res, next) => {
   if(req.session.isLoggedIn)
   {
       return res.redirect('/dashboard');
   }
    res.render("login",{
        csrfToken : req.csrfToken()
    }); 
}
exports.showSignupPage = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard');
    }
    res.render("register",{
        csrfToken : req.csrfToken()
    });
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
                    //logging in after registeration..... 
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        if(err)
                        {
                            console.log(user.email + "EXIST >>>>>>>>>> ")
                            console.log(" COULDN'T SAVE SESSION INTO DATASTORE ");
                            return res.redirect('/login');
                        }
                        console.log("NEW SESSION CREATED");
                        return res.redirect('/dashboard');
                    });
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
 
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            
            console.log("----- LOGIN FAILED :USER DONT EXIST -------");
            return res.redirect('/login');
        }
        console.log(user.email + " EXIST >>>>>>>>>> ")
        bcrypt.compare(password,user.password)
        .then((passwordMatches) => {
            console.log(" Password matched : " + passwordMatches);
            if(passwordMatches){
                //setting session for the user
                
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    if(err)
                    {
                        console.log(user.email + "EXIST >>>>>>>>>> ")
                        console.log(" COULDN'T SAVE SESSION INTO DATASTORE ");
                        return res.redirect('/login');
                    }
                    console.log("NEW SESSION CREATED");
                    return res.redirect('/dashboard');
                });
            }
            else{
                  // if password doesnt match
                  console.log('-------password doest match-------');   
                  return res.redirect('/login');
            }
          
            
        })
        .catch( (err) => {
            console.log(err);
            return res.redirect('/login');
        });
       
    })
    .catch( err => console.log(err) );
     
}

exports.logout = (req,res,next) =>{

    if(req.session){
        req.session.destroy((err)=>{
            if(err){
                return res.send("Something went wrong..! Please try again later.");
            }
            else{
                return res.redirect('/');
            }
        });
    }
}