const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const MongoConnect = require('./util/database').mongoConnect;
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');


const sessionStore = new MongoDBStore({
    uri : "mongodb://127.0.0.1:27017",
    databaseName: 'notice-board',
    collection : 'sessions'
}); 


//Session middleware
app.use(session({
    secret : 'mysecretstring',
    resave : false,
    saveUninitialized : false,
    store : sessionStore
})); 


//body parser
app.use(bodyParser.urlencoded({extended : false}));

// setting up static file folder----------------------
app.use(express.static(path.join(__dirname, 'public')));

// setting up session storage on mongoDB

//configure handlebar
app.engine('hbs',hbs({
    extname: 'hbs',
    defaultLayout: null,
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}))
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'views'))
 
// user routes
app.use(userRoutes);
//admin routes
app.use('/admin',adminRoutes);
//auth routes
app.use(authRoutes);




MongoConnect(() => {
    console.log("----- CONNECTED TO MongoDB SUCCESSFULLY------");
    app.listen(5000);
});
 