const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    count: String
});

mongoose.model('Medicice', MedicineSchema);