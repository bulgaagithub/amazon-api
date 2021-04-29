const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");

exports.createComment = asyncHandler(async (req, res, next) => {
  const comment = await req.db.comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comment.findByPk(req.params.id);

  if (!comment) {
    throw new MyError(req.params.id + " ID-тэй тайлбар олдсонгүй.", 400);
  }

  comment = await comment.update(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comment.findByPk(req.params.id);

  if (!comment) {
    throw new MyError(req.params.id + " ID-тэй тайлбар олдсонгүй.", 400);
  }

  await comment.destroy();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comment.findByPk(req.params.id);

  if (!comment) {
    throw new MyError(req.params.id + " ID-тэй тайлбар олдсонгүй.", 400);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});
