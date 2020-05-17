var router = require('express').Router();
var path = require('path');
var User = require('../models/User');


router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../login.html'));
})

router.get('/signup', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../signup.html'));
})

router.get('/dashboard', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../dashboard.html'));
})

router.post('/process-login', async (req,res)=> {
    console.log(req.body);
    //console.log(typeof(req.body));
    const savedUser = await User.findOne({email: req.body.email});
    console.log(savedUser);
    if (!savedUser) {
        res.send('No email exists')
    }else {
        if (req.body.password === savedUser.password) {
            res.redirect('/dashboard');
        }
        else {
            res.send('Wrong password');
        }   
    }

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
    console.log(user);
    try{
        const savedUser = await user.save();
        res.redirect('/dashboard');
    }catch{
        res.send('Error');
    }
});

module.exports = router;