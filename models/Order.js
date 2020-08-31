const mongoose = require("mongoose");
const { Schema } = mongoose;


const orderSchema= new Schema({
orderid:Number,
lalitude:Number,
longitude:Number,
place:String,
storeid:{
          type:Number,
          required:true
                },
image:String ,        // prescription storing
cancel:Boolean       //to place and cancel


});

mongoose.model("Order",orderSchema);

// place order
// cancel
