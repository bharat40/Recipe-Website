const jwt = require('jsonwebtoken');
const { sendError, sendSuccess } = require('../utility/response.js');

const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return sendError(res, "Token not valid", err, 400);
            }
            else {
                req.user = decoded;
            }
        });
        next();
    }
    else {
        return sendError(res, "Token not available", err, 400);
    }
}

module.exports = { verifyToken };