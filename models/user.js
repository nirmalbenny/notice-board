const getDb =require('../util/database').getDb;

class User{
    constructor(email,organisation,password){
        this.email=email;
        this.organisation=organisation;
        this.password=password;
    }
    save(){
        const db = getDb();
         return db.collection('users').insertOne(this)
        .then(result =>{
            console.log("-------then inside save----");
            console.log(result);
        })
        .catch(err=>{
            Console.log(err);
        });
    }
}

module.exports = User;