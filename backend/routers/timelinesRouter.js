const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController.js");

router.get("/get-timelines", timelinesController.getTimelines);
router.get('/get-memories', timelinesController.getMemories)

router.post('/post-timeline', timelinesController.postTimeline)
router.post('/post-memory', timelinesController.postMemory)

module.exports = router;
