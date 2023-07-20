const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://relynrelax:RelyNRelax@cluster0.z4idhzt.mongodb.net/relynrelax?retryWrites=true&w=majority";


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

