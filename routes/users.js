const express = require("express");

const { register } = require("../controller/users");

const router = express.Router();

//"/api/v1/books"
router.route("/").post(register);

module.exports = router;
