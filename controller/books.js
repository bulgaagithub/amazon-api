const Book = require('../models/book');
const Category = require('../models/category');
const MyError = require('../utils/myerror');
// const asyncHandler = require('../middleware/asyncHandler');
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");

// api/v1/books
exports.getBooks = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort;
    const select = req.query.select;
  
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
  
    const pagination = await paginate(page, limit, Book);
  
    const books = await Book.find(req.query, select)
      .populate({
        path: "category",
        select: "name averagePrice",
      })
      .sort(sort)
      .skip(pagination.start - 1)
      .limit(limit);
  
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
      pagination,
    });
});

// api/v1/categories/:catId/books
exports.getCategoryBooks = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const sort = req.query.sort;
    const select = req.query.select;
  
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
  
    const pagination = await paginate(page, limit, Book);
  
    //req.query, select
    const books = await Book.find(
      { ...req.query, category: req.params.categoryId },
      select
    )
      .sort(sort)
      .skip(pagination.start - 1)
      .limit(limit);
  
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
      pagination,
    });
});

exports.getBook = asyncHandler(async (req, res, next) => {
    
    const book = await Book.find({ _id: req.params.id });
    // const book = await Book.findById( req.params.id );

    if (!book) {
        throw new MyError(req.params.id + ' ID-тэй ном байхгүй байна.', 404);
    }

    res.status(200).json({
        success: true,
        data: book,
    });
});

exports.createBook = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.body.category);

    if (!category) {
        throw new MyError(req.body.category + ' ID-тэй категори байхгүй байна.', 404);
    }

    const book = await Book.create(req.body);

    res.status(200).json({
      success: true,
      data: book,
    });
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
  
    if (!book) {
      throw new MyError(req.params.id + ' ID-тэй ном байхгүй байна.', 404);
    }
  
    book.remove();
  
    res.status(200).json({
      success: true,
      data: book,
    });
});

exports.updateBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!book) {
      throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
    }
  
    res.status(200).json({
      success: true,
      data: book,
    });
});

// PUT:  api/v1/books/:id/photo
exports.uploadBookPhoto = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
  
    if (!book) {
      throw new MyError(req.params.id + " ID-тэй ном байхгүйээ.", 400);
    }
  
    // image upload
  
    const file = req.files.file;
  
    if (!file.mimetype.startsWith("image")) {
      throw new MyError("Та зураг upload хийнэ үү.", 400);
    }
  
    if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
      throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
    }
  
    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
      if (err) {
        throw new MyError(
          "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
          400
        );
      }
  
      book.photo = file.name;
      book.save();
  
      res.status(200).json({
        success: true,
        data: file.name,
      });
    });
});
