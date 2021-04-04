const express = require('express');
const router = express.Router({mergeParams: true});

// Router дээр зөвхөн холболтын хэсгүүд байрлана.
// route - чиглүүлэх 

// Import router from controller

const {getBooks} = require("../controller/books");
// /api/v1/books
router.route('/').get(getBooks);
// router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;
