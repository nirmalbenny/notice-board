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
            console.log("-------then inside save----");
        })
        .catch(err=>{
            console.log("NoticeBoard Creation Failed");
        });


    }
}