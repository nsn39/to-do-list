const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');


require('./config/passport')(passport);

app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));
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

//Initializing passwords
app.use(passport.initialize());


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