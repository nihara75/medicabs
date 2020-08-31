const mongoose = require("mongoose");
const { Schema } = mongoose;
const Order = require('mongoose').model('Order');
const Medicine = require('mongoose').model('Medicine');


const partnerSchema = new Schema({
  partnerid:Number,
  order:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }], //Order object
  medicine:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',

    }],
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
