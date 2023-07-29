const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;


const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully!');

        // const collection = mongoose.connection.db.collection('users');
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoDB;

