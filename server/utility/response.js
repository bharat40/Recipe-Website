const sendSuccess = (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
}

const sendError = (res, message = "Something went wrong", err = {}, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
        err: err
    });
}

module.exports = { sendError, sendSuccess };