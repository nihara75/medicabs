const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./models/User');
require('./models/Medicine');
require('./models/Order');
require('./models/Partner');

const keys = require('./config/keys');
const authUserRoutes = require('./routes/authUserRoutes');
const authPartnerRoutes = require('./routes/authPartnerRoutes');
const orderRoutes = require('./routes/orderRoutes');

mongoose.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("DATABASE: Connection to database successful!"))
	.catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: keys.sessionSecret,
    resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname));

app.use('/auth/user', authUserRoutes);
app.use('/auth/partner', authPartnerRoutes);
app.use('/api/order', orderRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Listening to port ${PORT}`);
});
