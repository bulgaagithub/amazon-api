const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    user: req.body,
  });
});
