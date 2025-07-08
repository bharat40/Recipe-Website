const mongoose = require('mongoose');


const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Database connected");
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connectDB };