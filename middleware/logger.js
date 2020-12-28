const logger = (req, res, next) => {
    req.userId = "secret-user";
    console.log(`logger: ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    // must call
    next();
}

module.exports = logger;