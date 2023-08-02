const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('message', MessageSchema);
