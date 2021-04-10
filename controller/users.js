const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const MyError = require('../utils/myerror');
const paginate = require('../utils/paginate');

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
        throw new MyError('Имэйл болон нууц үгээ дамжуулна уу.', 404)
    }

    const user = await User.findOne({ email }).select('+password')
  
    if(!user) {
        throw new MyError('Имэйл болон нууц үгээ зөв оруулна уу.', 401)
    }

    const ok = await user.checkPassword(password)

    if(!ok) {
        throw new MyError('Имэйл болон нууц үгээ зөв оруулна уу.', 401)
    }

    res.status(200).json({
      success: true,
      token: user.getJWT(),
      user: user,
    })
})

exports.getUsers = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort;
    const select = req.query.select;
  
    ['select', 'sort', 'page', 'limit'].forEach((el) => delete req.query[el]);
  
    const pagination = await paginate(page, limit, User);
  
    const users = await User.find(req.query, select)
      .sort(sort)
      .skip(pagination.start - 1)
      .limit(limit);
  
    res.status(200).json({
      success: true,
      data: users,
      pagination,
    });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    throw new MyError(req.params.id + ' ID-тэй хэрэглэгч байхгүй.', 400);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new MyError(req.params.id + ' ID-тэй хэрэглэгч байхгүй.', 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new MyError(req.params.id + ' ID-тэй хэрэглэгч байхгүй.', 400);
    }

    user.remove();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});
