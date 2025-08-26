const express = require("express");
const router = express.Router();
const schoolController = require("./controllers/controller");

router.post("/addSchool", schoolController.addSchool);
router.get("/listSchools", schoolController.listSchools);

module.exports = router;
