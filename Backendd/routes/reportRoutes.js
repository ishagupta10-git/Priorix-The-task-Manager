const express=require("express");
const { protect,adminOnly } = require("../middlewares/authMiddleware.js");
const router=express.Router();
const { exportTasksReport, exportUsersReport } = require("../controllers/reportControllers");

router.get("/exports/tasks",protect,adminOnly,exportTasksReport);
router.get("/exports/users",protect,adminOnly,exportUsersReport);
module.exports=router;