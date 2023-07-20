const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin', AdminSchema);