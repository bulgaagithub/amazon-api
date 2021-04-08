const express = require("express");

const { register, login } = require("../controller/users");

const router = express.Router();

//"/api/v1/books"
router.route("/").post(register);
router.route("/login").post(login);

module.exports = router;
