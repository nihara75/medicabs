const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const PartnerSchema = new Schema({
	
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
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
	shopClosed: {
		type: Boolean,
		default: false
	}
});

PartnerSchema.pre('save', async function (next){
    const partner = this;
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(partner.password, salt, null);
            partner.password = hashedPassword;
            next();
        } catch(err) {
            return next(err);
        }
    } else {
        return next();
    }
});

PartnerSchema.methods.comparePassword =  async function(passw, next) {

    try {
        const isMatch = await bcrypt.compare(passw, this.password); 
        next(null, isMatch);
    } catch(err) {
        return next(err);
    }
};

mongoose.model("Partner", PartnerSchema);
