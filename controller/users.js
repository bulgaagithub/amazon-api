const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const MyError = require('../utils/myerror');

// register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getJWT();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});



// login
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        throw MyError('Имэйл болон нууц үгээ дамжуулна уу.', 404)
    }

    const user = await User.findOne({ email }).select('+password')
  
    if(!user) {
        throw MyError('Имэйл болон нууц үгээ зөв оруулна уу.', 401)
    }

    const ok = await user.checkPassword(password)

    if(!ok) {
        throw MyError('Имэйл болон нууц үгээ зөв оруулна уу.', 401)
    }

    res.status(200).json({
      success: true,
      token: user.getJWT(),
      user: user,
    })
  })
