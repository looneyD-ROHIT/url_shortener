const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Connected to Database');
    } catch (error) {
        console.log('Couldn\'t connect to database');
        process.exit(1);
    }
};

module.exports = connectDB;