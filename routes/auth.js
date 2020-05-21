var router = require('express').Router();
var path = require('path');
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var mongoose = require('mongoose');

//I know this is not secure bt this is how I'm saving the logged in user.
var user_email;

router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../login.html'));
})

router.get('/signup', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../signup.html'));
})

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    user_email = req.user.email;
     return res.render('dashboard', {
        user: req.user
    })
})

router.post('/process-login', (req,res,next)=> {
   passport.authenticate('local', {
       failureRedirect: '/login',
       successRedirect: '/dashboard'
   })(req, res,next);
});

router.post('/process-signup', async (req,res)=> {
    console.log(req.body.firstname);
    //Making a user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });

    //Generating a salt and hashing password
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    console.log(user);
    try{
        const savedUser = await user.save();
        res.redirect('/dashboard');
    }catch{
        res.send('Error');
    }
});

//Logout feature
router.get('/logout', (req, res) => {
    req.logOut();
    res.sendFile(path.join(__dirname, '/../login.html'));
});

//Adding new item to the list
router.post('/add', async (req, res) => {
    //console.log(user_email);
    
    const new_value = req.body.new_item;
    //console.log(new_value);

    const filter = {email: user_email};
    const update = {$addToSet: {tasks: [new_value]}};
    const option = {useFindAndModify: false};
    
    await User.updateOne(filter, update, option, async (err, result) => {
        if (err) {
            res.send('Error');
        }else {
            const savedUser = await User.findOne({email: user_email});
            //console.log(await User.findOne({email: user_email}));
            res.render('dashboard', {
                user: savedUser
            });
        }
    });
    
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;