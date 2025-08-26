const express = require("express");
const router = express.Router();
const schoolController = require("./controllers/controller");

router.post("/addSchool", schoolController.addSchool);
router.get("/listSchools", schoolController.listSchools);

module.exports = router;
// mysql://root:wDurUOHXzripOSgwnVcIahoCoeOwtKyM@mysql.railway.internal:3306/schools
