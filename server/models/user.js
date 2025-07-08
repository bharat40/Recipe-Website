const mongoose = require('mongoose');
const AVATAR = process.env.DEFAULT_AVATAR;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userProfile: {
        type: String,
        default: AVATAR
    }
}, { timestamps: true });

const userModel = mongoose.model('Users', userSchema);
module.exports = { userModel };