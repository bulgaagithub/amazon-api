const express = require("express");

const { getUserBooks } = require("../controller/books");

const { 
    register, 
    login, 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser,
    forgotPassword
} = require("../controller/users");

const { protect, authorize } = require("../middleware/protect")

const router = express.Router();


//"/api/v1/users"
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);

router.use(protect)

router.route("/").get(authorize("admin"), getUsers).post(authorize("admin"), createUser);
router.route("/:id").get(authorize("admin", "operator"), getUser).put(authorize("admin"), updateUser).delete(authorize("admin"), deleteUser);

router.route("/:id/books").get(authorize("admin", "operator", "user"), getUserBooks);

module.exports = router;
