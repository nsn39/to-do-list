var router = require('express').Router();
var path = require('path');
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var passport = require('passport');

router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../login.html'));
})

router.get('/signup', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../signup.html'));
})

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
     return res.render('dashboard', {
        user: req.user
    })
})

router.post('/process-login', (req,res,next)=> {
    /*
    console.log(req.body);
    //console.log(typeof(req.body));
    const savedUser = await User.findOne({email: req.body.email});
    console.log(savedUser);
    //var salt = bcrypt.genSaltSync(10);
    //console.log(bcrypt.hashSync(req.body.password), salt);
    if (!savedUser) {
        res.send('No email exists')
    }else {
        if (bcrypt.compareSync(req.body.password, savedUser.password)) {
            res.redirect('/dashboard');
        }
        else {
            res.send('Wrong password');
        }   
    }
    */
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

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;