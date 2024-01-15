const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController.js");

router.get("/get-timelines", timelinesController.getTimelines);
router.get('/get-memories', timelinesController.getMemories)
router.get('/get-timeline-view-count', timelinesController.getTimelineViewCount)

router.post('/post-timeline', timelinesController.postTimeline)
router.post('/post-memory', timelinesController.postMemory)
router.post('/post-timeline-visit', timelinesController.postTimelineVisit)

router.delete('/delete-timeline/:timeline_id', timelinesController.deleteTimeline)


module.exports = router;
