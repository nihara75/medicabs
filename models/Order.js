const mongoose = require("mongoose");
const { Schema } = mongoose;


const orderSchema= new Schema({
orderid:Integer,
lalitude:Integer,
longitude:Integer,
place:String,
storeid:{
          type:Integer,
          required:true
                },
image:String ,        // prescription storing
cancel:Boolean       //to place and cancel


});

mongoose.model("Order",orderSchema);

// place order
// cancel
