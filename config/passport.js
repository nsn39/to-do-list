const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    console.log('fuckk');
    passport.use(new LocalStrategy( {
        usernameField: 'email',
        passwordField: 'password'
        },
        function(email, password, done) {
        //Checking for user in the database
        console.log('fuckk1');
        User.findOne({email: email}, function(err, user){ 
            console.log(user);
            //console.log(err);
            //console.log(2);
            if (err) { console.log(err, 'this is theshit'); return done(err); }
            //var salt  = bcrypt.genSalt(10);
            //console.log(salt);
            //console.log(bcrypt.hashSync(password, salt));
            if (!user) { console.log(2); return done(null, false); }
            
            if (!bcrypt.compareSync(password, user.password)) { console.log(1); return done(null, false); }
            //console.log(2);
            return done(null, user);
        })
    }))
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
        
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};