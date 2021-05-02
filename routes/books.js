const express = require('express');
const { protect, authorize } = require('../middleware/protect');
const router = express.Router();


const { getBookComments } = require("../controller/comments");

const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  uploadBookPhoto,
} = require('../controller/books');


//'/api/v1/books'
router.route('/').get(getBooks).post(protect, authorize('admin','operator'), createBook);

router.route('/:id').get(getBook).delete(protect, authorize('admin'), deleteBook).put(protect, authorize('admin','operator'), updateBook);

router.route('/:id/photo').put(protect, authorize('admin','operator'), uploadBookPhoto); 

router.route('/:id/comments').get(getBookComments);

module.exports = router;
