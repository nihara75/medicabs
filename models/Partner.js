const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerSchema = new Schema({
	
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	partnerName: {
		type: String,
		required: true
	},
	locality: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	closed: {
		type: Boolean,
		default: false
	}
});

mongoose.model("Partner", partnerSchema);
