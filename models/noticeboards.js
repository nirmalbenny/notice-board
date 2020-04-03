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
    static findOne(id){
        try{
            const db= getDb();
            return db.collection('notice-board')
             .findOne({"_id" : new mongo.ObjectId(id)})
             .then(d => {
                console.log(d);
                console.log("-------------------------------------------->>");
                return d;
             })
            .catch(err=>{
                console.log(err);
            })
        }catch(err)
        {
            console.log(err);
        }
    }
    static deleteOne(id){
        const db = getDb();
        return db.collection('notice-board').deleteOne({_id: new mongo.ObjectId(id) })
              .then(result =>{
                  return result;
              })
              .catch(err => console.log(err));
                
    }
    static updateNB(query,userID){
        const db=getDb();
        console.log(" QUERY : ",query._id);
        return db.collection('notice-board').updateOne(
            { 
                userid: new mongo.ObjectID(userID),
                _id: new mongo.ObjectID(query._id)
             },
            {
             $set : { 
                     'title': query.title,
                     'emailContact' : query.emailContact,
                     'phoneContact': query.phoneContact 
                   }
           })
            .then(data => {
                if(data.modifiedCount>0){
                    return {
                        status : "success"
                    }
                }else{
                    return {
                        status : "failed"
                    }
                }
                
            })
            .catch(err =>{
                console.log(err);
            });

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
       return db.collection('notice-board').count({ "urlname" :uri})
        .then(count => {
            console.log("Count : ",count);
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