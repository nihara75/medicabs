const router = require('express').Router();
const passport = require('passport');
const User = require('mongoose').model('User');

require('../services/passport')(passport);
const { unauthenticatedOnly } = require('../middlewares/authMiddleware');

router.post('/signup',
    unauthenticatedOnly,
    async (req, res) => {
        const { email, password, name, phoneNo, address, medicalInfo } = req.body;

        try {
            const user = new User({ email, password, name, phoneNo, address, medicalInfo });
            await user.save();

            res.json({success: true, message: 'User created succesfully'});
        } catch(err) {
            return res.status(422).send(err.message);
        }
    }
);

router.post('/login', 
    unauthenticatedOnly, 
    passport.authenticate('user-local', {
        failureRedirect: '/auth/user/loginFailure'
    }),
    (req, res) => {
        return res.send({ success: true, user: req.user });
    }
);

router.get('/loginFailure', (req, res) => {
    res.json({ success: false, user: false, message: 'User login failed' });
});

router.get('/currentUser', (req, res) => {
    return req.user.type === 'client' ? res.send(req.user) : res.send(null);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;

