const { userModel } = require('../models/user.js');
const { sendError, sendSuccess } = require('../utility/response.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return sendError(res, "Missing Details", 400);
        }
        const existedUser = await userModel.findOne({ email: email });
        if (existedUser) {
            return sendError(res, "User already exists", 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username: username, email: email, password: hashedPassword });
        await newUser.save();
        let token = jwt.sign({ username: newUser.username, id: newUser._id, userProfile: newUser.userProfile }, process.env.SECRET_KEY, { expiresIn: '1hr' });
        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            userProfile: newUser.userProfile,
            token
        }
        return sendSuccess(res, "User created successfully", userResponse, 201);
    } catch (error) {
        return sendError(res, error.message, error);
    }
};
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendError(res, "Missing Details", undefined, 400);
        }
        const existedUser = await userModel.findOne({ email: email });
        if (!existedUser) {
            return sendError(res, "User not found", undefined, 404);
        }
        const passwordValid = await bcrypt.compare(password, existedUser.password);
        if (!passwordValid) {
            return sendError(res, "Password incorrect", undefined, 400);
        }
        let token = jwt.sign({ username: existedUser.username, id: existedUser._id, userProfile: existedUser.userProfile }, process.env.SECRET_KEY, { expiresIn: '1hr' });
        const userResponse = {
            id: existedUser._id,
            username: existedUser.username,
            email: existedUser.email,
            userProfile: existedUser.userProfile,
            token
        }
        return sendSuccess(res, "Logged in", userResponse, 201);
    } catch (error) {
        return sendError(res, error.message, error);
    }
};
const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            return sendError(res, "User not found", 404);
        }
        const userResponse = {
            username: user.username,
            email: user.email,
            userProfile: user.userProfile
        }
        return sendSuccess(res, "User details fetched", user, 200);
    } catch (error) {
        return sendError(res, error.message, error);
    }
};
const getUsersCount = async (req, res) => {
    try {
        const numberOfUsers = await userModel.countDocuments();
        return sendSuccess(res, undefined, numberOfUsers, undefined);
    } catch (error) {
        return sendError(res, error.message, error);
    }
}

module.exports = { userSignUp, userLogin, getUser, getUsersCount };