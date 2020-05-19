const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');

require('./config/passport')(passport);

//
app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    //{  },
    () => console.log('Connected to DB!')
);

app.set('view engine', 'ejs');

//Initializing passwords
app.use(passport.initialize());
app.use(passport.session());

//Importing routes
const userRoutes = require('./routes/auth');

//Defining routes
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//Use static files
app.use(express.static(__dirname + '/scripts'));

app.use('/', userRoutes);


app.listen(3000, console.log("Server running...."));