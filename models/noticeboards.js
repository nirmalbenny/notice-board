const getDb = require('../util/database').getDb;
class NoticeBoard{
    constructor(userid,urlname,title,emailContact,phoneContact){
        this.userid = userid;
        this.urlname = urlname;
        this.title = title;
        this.emailContact = emailContact;
        this.phoneContact = phoneContact;
    }
    save(){

        const db = getDb();
        return db.collection('notice-board')
        .insertOne(this)
        .then(result=>{
            console.log("-------nnoticeboard saved----");
        })
        .catch(err=>{
            console.log("NoticeBoard Creation Failed");
        });


    }
    static isExisting(uri){
        const db = getDb();
       return db.collection('notice-boards').count({urlname:uri})
        .then(count => {
            if(count>0){
                return true;
            }
            else{
                return false;
            }
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
}
module.exports = NoticeBoard;