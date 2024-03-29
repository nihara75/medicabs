const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Partner = mongoose.model('Partner');

module.exports = function(passport) {

    passport.use('user-local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async function(username, password, done) {
            try {
                const user = await User.findOne({ email: username });
                if(!user) return done(null, false);

                user.comparePassword(password, (err, isMatch) => {
                    if(err) return done(err);
                    if(!isMatch) return done(null, false, { success: false, message: 'Invalid email or password' });

                    return done(null, { id: user._id, email: user.email, name: user.name, phoneNo: user.phoneNo, type: 'client' });
                });
            } catch(err) {
                return done(err);
            }
        }
    ));

    passport.use('partner-local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async function(username, password, done) {
            try {
                const partner = await Partner.findOne({ email: username });
                if(!partner) return done(null, false);

                partner.comparePassword(password, (err, isMatch) => {
                    if(err) {
                        console.log(err);
                        return done(err);
                    }
                    if(!isMatch) return done(null, false, { success: false, message: 'Invalid email or password' });

                    return done(null, { id: partner._id, email: partner.email, name: partner.name, type: 'partner' });
                });
            } catch(err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser(function(user, next) {
        next(null, { id: user.id, type: user.type });
    });
      
    passport.deserializeUser(async function(user, next) {

        switch(user.type) {
            case 'client':
                try {
                    const client = await User.findById(user.id);
                    if(!client) return next(null, false);;
        
                    next(null, { id: client._id, email: client.email, name: client.name, phoneNo: client.phoneNo, type: 'client' });
                } catch(err) {
                    next(err);
                }
                break;
            case 'partner':
                try {
                    const partner = await Partner.findById(user.id);
                    if(!partner) return next(null, false);;
        
                    next(null, { id: partner._id, email: partner.email, name: partner.name, type: 'partner' });
                } catch(err) {
                    next(err);
                }
                break;
        }
        
    });
}