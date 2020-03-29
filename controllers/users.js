const User = require('../models/user');
const Noticeboard = require('../models/noticeboards');

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
        route : req.url,
        csrfToken : req.csrfToken()
    });
}
exports.checkUrl = (req, res, next) => {
    if(!req.session.isLoggedIn)
    {
        return res.status(500).json({ "status" : "access denied"});
    }
    const url = req.body.searchUrl; // get search query from search field
    Noticeboard.isExisting(url)
    .then((isTaken) =>{
        console.log(" noticebaord name is taken >>>>>>>>>>",isTaken);
        if(isTaken){
            res.status(200).json({
                "status" : "success",
                "available" :false
            });
        }
        else{
            res.status(200).json({
                "status" : "success",
                "available" :true
            });
        }
    })
    .catch((err) => {
        console.log(err);
        console.log("Error Checking Url Availability");
    })


}

exports.postAddNoticeBoard = (req,res,next) => {
    console.log(req.body);
     
    const nb = new Noticeboard(req.session.user._id,req.body.urlname,req.body.title,req.body.emailContact,req.body.phoneContact);
   nb.save();
    res.status(200).json({
        status : "success"
    });
}