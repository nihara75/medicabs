const mongoose = require("mongoose");
const { Schema } = mongoose;


const orderSchema= new Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	partner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Partner',
		required: true
	},
	// The address field may be split into multiple fields
	deliveryAddress: {
		type: String,
		required: true
	},
	cancelled: {
		type: Boolean,
		default: false
	},
	delivered: {
		type: Boolean,
		default: false
	},
	active: {
		type: Boolean,
		default: true
	}
	
	// image:String,        // prescription storing

});

mongoose.model("Order",orderSchema);

// place order
// cancel
