const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

app.use(express.json());
app.use(bodyparser());
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