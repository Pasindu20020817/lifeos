/**
 * Global Error Handler
 *
 * Any error passed using:
 * next(error)
 *
 * will end up here.
 */
const errorHandler = (error, req, res, next) => {

    console.error("Global Error:", error);

    return res.status(error.statusCode || 500). json({
        success: false,
        message: error.message || "Internal Server Error",
    });
};

module.exports = errorHandler;