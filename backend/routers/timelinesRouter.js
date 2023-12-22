const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController.js");

router.get("/get-timelines", timelinesController.getTimelines);

module.exports = router;
