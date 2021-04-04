const Book = require("../models/book");
const MyError = require("../utils/myerror");
const asyncHandler = require("../middleware/asyncHandler");

// api/v1/books
// api/v1/categories/:catId/books

exports.getBooks = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.categoryId) {
        query = Book.find({category: req.params.categoryId})
    } else {
        query = Book.find({}).populate({
            path: 'category',
            select: 'name averagePrice',
        });
    }
    
    const books = await query;

    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
    });
});
