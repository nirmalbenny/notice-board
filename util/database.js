const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

//Connecting to MongoDB
const mongoConnect = callback =>{

    MongoClient.connect(
        'mongodb://127.0.0.1:27017',
        { 
            useUnifiedTopology: true 
        }
    )
    .then(client=>{
        console.log('connected')
        _db = client.db('notice-board'); 
        callback();
    })
    .catch(err=>{
        console.log(err);
      
    });
    
};
const getDb = () =>{
    if(_db)
    {
        return _db
    }
    throw 'Database not found'
}
// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
 exports.getDb = getDb;
 exports.mongoConnect = mongoConnect;

