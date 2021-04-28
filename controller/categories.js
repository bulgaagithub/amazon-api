const Category = require("../models/category");
const MyError = require("../utils/myerror");
// const asyncHandler = require("../middleware/asyncHandler");

const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");

exports.getCategories = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort;
    const select = req.query.select;
  
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
  
    const pagination = await paginate(page, limit, Category);
  
    const categories = await Category.find(req.query, select)
      .sort(sort)
      .skip(pagination.start - 1)
      .limit(limit);
  
    res.status(200).json({
      success: true,
      data: categories,
      pagination,
    });
});

exports.getCategory = asyncHandler(async (req, res, next) => {

//   req.db.teacher.create({
//       id: 1,
//       name: 'Мөнх-Эрдэнэ',
//       phone: '99024244',
//       password: '12345678'
//   });

  const category = await Category.findById(req.params.id).populate('books');
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
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    category.remove();

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
});
