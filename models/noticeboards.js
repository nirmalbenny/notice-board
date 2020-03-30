const getDb = require('../util/database').getDb;
const mongo = require('mongodb')
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
            console.log("-------noticeboard saved----");
        })
        .catch(err=>{
            console.log("NoticeBoard Creation Failed");
        });


    }
    static deleteOne(id){
        const db = getDb();
        return db.collection('notice-board').deleteOne({_id: new mongo.ObjectId(id) })
              .then(result =>{
                  return result;
              })
              .catch(err => console.log(err));
                
    }
    static getAll(userid){
        const db = getDb();
        return db.collection('notice-board')
        .find({userid : userid})
        .project({"userid" : 0})
        .toArray()
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err);
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