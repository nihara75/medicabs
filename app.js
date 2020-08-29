const express=require("express");
const mongoose=require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://nihara:JrJGwZFofqaUip8P@cluster0.llxb8.mongodb.net/medicab-dev?retryWrites=true&w=majority", {useNewUrlParser: true,useUnifiedTopology:true});
const loginSchema = {
  name: String,
  password: String,
  post:String
};

const profileSchema={
  name:String,
  ph:String,
  email:String,
  medicalinfo:String,
  address:String
}

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

const Login = mongoose.model("login", loginSchema);
const Profile=mongoose.model("profile",profileSchema);

app.get("/",(req,res)=>{
  res.render("/Landing");
});


















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
