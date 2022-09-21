ResponseHandler = (res, statusCode, message, payload) => {
    res.status(statusCode || 200).json({
        code: statusCode || 200,
        message: message || "success",
        payload: payload || {},
    });
};

module.exports = ResponseHandler;