const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        // unique: true
    },
    medicalInfo: String,
    address: String
});

UserSchema.pre('save', async function (next){
    const user = this;
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt, null);
            user.password = hashedPassword;
            next();
        } catch(err) {
            return next(err);
        }
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword =  async function(passw, next) {

    try {
        const isMatch = await bcrypt.compare(passw, this.password); 
        next(null, isMatch);
    } catch(err) {
        return next(err);
    }
};

mongoose.model('User', UserSchema);

// signup
// login
// logout
// edit




