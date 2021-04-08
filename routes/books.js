const express = require("express");

const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  uploadBookPhoto,
} = require("../controller/books");

const router = express.Router();

//"/api/v1/books"
router.route("/").get(getBooks).post(createBook);

router.route("/:id").get(getBook).delete(deleteBook).put(updateBook);

router.route("/:id/photo").put(uploadBookPhoto);

module.exports = router;
