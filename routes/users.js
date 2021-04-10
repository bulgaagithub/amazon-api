const express = require("express");

const { 
    register, 
    login, 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser } = require("../controller/users");

const router = express.Router();

//"/api/v1/users"
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
