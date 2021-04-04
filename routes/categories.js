const express = require('express');
const router = express.Router();

// Router дээр зөвхөн холболтын хэсгүүд байрлана.
// route - чиглүүлэх 

// Import router from controller

const { getCategories, 
        getCategory, 
        createCategory, 
        updateCategory, 
        deleteCategory,
      } = require("../controller/categories");


// /api/v1/categories/:id/books
// First Approach
// const { getBooks } = require("../controller/books");
// router.route('/:categoryId/books').get(getBooks);

// Second Approach 
// Pass Book route 
const booksRouter = require("./books");
router.use('/:categoryId/books', booksRouter);

// /api/v1/categories 
router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;
