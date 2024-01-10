const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController.js");

router.get("/get-timelines", timelinesController.getTimelines);
router.post('/post-timeline', timelinesController.postTimeline)
router.post('/add-memory', timelinesController.addMemory)

module.exports = router;
