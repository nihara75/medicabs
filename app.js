const express=require("express");
const mongoose=require("mongoose");

const keys = require('./config/keys');

require('./models/User');

mongoose.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("DATABASE: Connection to database successful!"))
	.catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ 
    secret: keys.sessionSecret, 
    resave: false, saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

const medistoreSchema={
  name:String,
  ph:String,
  email:String,
  location:String
}

const medicineSchema={
  name:String,
  dosage:String,
  count:String
}

app.get("/", (req,res) => { 
	console.log('Hi There!')
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Listening to port ${PORT}`);
});
