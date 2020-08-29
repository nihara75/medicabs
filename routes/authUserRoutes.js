const router = require('express').Router();
const passport = require('passport');
const User = require('mongoose').model('User');

require('../services/passport')(passport);



module.exports = router;













// signup
// login
// logout
// edit