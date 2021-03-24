const Category = require("../models/category");
const MyError = require("../utils/myerror");
const asyncHandler = require("../middleware/asyncHandler");

exports.getCategories = asyncHandler(async (req, res, next) => {
  const select = req.query.select;

  const sort = req.query.sort;

  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 100;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
  // Pagination
  const total = await Category.countDocuments();
  const pageCount = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  let end = start + limit - 1;
  if (end > total) end = total;

  const pagination = { total, pageCount, start, end, limit };
  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;

  const categories = await Category.find(req.query, select)
    .sort(sort)
    .skip(start - 1)
    .limit(limit);
  res.status(200).json({
    success: true,
    data: categories,
    pagination,
  });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
});
