const mongoose = require('mongoose');

const { Schema } = mongoose;

const BuyRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phone_no: {
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
    price_range: {
        min: {
            type: String,
            required: true
        },
        max: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('buyrequest', BuyRequestSchema);
