const mongoose = require('mongoose');

const { Schema } = mongoose;

const SellRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reg_no: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    km_ran: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    purchased: {
        type: String,
        required: true
    },
    owner_image: {
        type: String,
        required: true
    },
    adhar_image: {
        type: String,
        required: true
    },
    rc_image: {
        type: String,
        required: true
    },
    back_image: {
        type: String,
        required: true
    },
    side_image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'not verified'
    }
});

module.exports = mongoose.model('sellrequest', SellRequestSchema);
