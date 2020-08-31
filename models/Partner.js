const mongoose = require("mongoose");
const { Schema } = mongoose;
const Order = require('mongoose').model('Order');
const Medicine = require('mongoose').model('Medicine');


const partnerSchema = new Schema({
  partnerid:Integer,
  order:Order,  //Order object
  medicine:Medicine,
  status:{
          type:Boolean,
          required:true
        },
  closed:Boolean

});


mongoose.model("Partner",partnerSchema);



// register
// closed orders
// actve oderes
// close order
