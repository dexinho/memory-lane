const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController.js");

router.get("/getTimelines", timelinesController.getTimelinesController);

module.exports = router;
