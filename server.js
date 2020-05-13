const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(express.json());
app.use(bodyparser());

//Defining routes
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.get('/login', (req,res)=>{
    res.sendFile(__dirname+'/login.html');
})

app.get('/signup', (req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.get('/dashboard', (req,res)=>{
    res.sendFile(__dirname+'/dashboard.html');
})

app.post('/process-login', (req,res)=> {
    console.log(req.body);
    res.redirect('/dashboard');
});


//Use static files
app.use(express.static(__dirname + '/scripts'));

app.listen(3000, console.log("Server running...."));