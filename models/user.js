const getDb =require('../util/database').getDb;

class User{
    constructor(email,organisation,password){
        this.email=email;
        this.organisation=organisation;
        this.password=password;
    }
    save(){
        const db = getDb();
         return db.collection('users')
        .insertOne(this)
        .then(result =>{
            console.log("-------then inside save----");
            console.log(result);
        })
        .catch(err=>{
            Console.log(err);
        });
    }

    static findOne(query){
        const db = getDb();
        return db.collection('users').findOne(query)
        .then(result => {
            return result;
        })
        .catch(err=>{
            console.log(err);
            console.log("Error in method User.findOne() ");
        });
    }

    static isExisting(emailID){
        const db = getDb();
       return db.collection('users').count({email:emailID})
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

module.exports = User;