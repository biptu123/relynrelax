const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReminderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reg_no: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    alt_no: {
        type: String
    },
    whatsapp_no: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'not verified'
    }
});

module.exports = mongoose.model('reminder', ReminderSchema);
