const express = require('express');
const router = express.Router();

// Router дээр зөвхөн холболтын хэсгүүд байрлана.
// route - чиглүүлэх 

// Import router from controller

const {getCategories,getCategory,createCategory,updateCategory,deleteCategory} = require("../controller/categories");

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;