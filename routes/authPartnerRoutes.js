const router = require('express').Router();
const passport = require('passport');
const Partner = require('mongoose').model('Partner');

require('../services/passport')(passport);
const { unauthenticatedOnly } = require('../middlewares/authMiddleware');

router.post('/signup', async (req, res) => {

    const { email, password, name, locality, city  } = req.body;

    try {
        const partner = new Partner({ email, password, name, locality, city  });
        await partner.save();

        res.json({success: true, message: 'Partner created succesfully'});
    } catch(err) {
        return res.status(422).send(err.message);
    }
});

router.post('/login', 
    unauthenticatedOnly, 
    passport.authenticate('partner-local', {
        failureRedirect: '/auth/loginFailure'
    }),
    (req, res) => {
        return res.send({ success: true, partner: req.user });
    }
);

router.get('/loginFailure', (req, res) => {
    res.json({ success: false, user: false, message: 'User login failed' });
});

router.get('/currentUser', (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;

