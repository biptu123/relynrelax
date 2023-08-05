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
    address: {
        coords: {
            latitude: String,
            longitude: String
        },
        data: mongoose.Schema.Types.Mixed
    },
    owner_image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    adhar_image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    rc_image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    side_image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        default: 'not verified'
    }
});

module.exports = mongoose.model('sellrequest', SellRequestSchema);
