const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const MyError = require('../utils/myerror')

exports.protect = asyncHandler( async (req, res, next) => {
    let token = null;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies) {
        token = req.cookies["amazon-token"];
    }

    if (!token) {
        // throw new MyError('Токен байхгүй байна. Та эхлээд логин хийнэ үү.', 400)
        throw new MyError('Уучлаарай та хандах эрхгүй байна. Та эхлээд логин хийнэ үү.', 401)
    }

    const tokenObj = jwt.verify(token, process.env.JWT_SECRET)

    // req.user = await User.findById(tokenObj.id)
    req.userId = tokenObj.id
    req.userRole = tokenObj.role;

    next()
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            throw new MyError(
                "Таны эрх [" + req.userRole + "] энэ үйлдлийг гүйцэтгэхэд хүрэлцэхгүй!",
                403
            );
        }
        next()
    }
}
