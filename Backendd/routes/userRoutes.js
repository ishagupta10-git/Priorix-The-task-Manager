const express = require("express");
const { adminOnly,protect } = require("../middlewares/authMiddleware");

const router = express.Router();

const {getUsers, getUserById, deleteUser} = require("../controllers/userControllers");
router.get("/",protect,adminOnly,getUsers);
router.get("/:id",protect,getUserById);
router.delete("/:id",protect,adminOnly,deleteUser);

module.exports = router;