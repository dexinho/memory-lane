const timelinesModel = require("../models/timelinesModel");

timelinesController = {};

const getTimelines = async (req, res) => {
  try {
    let { offset, limit, user_id, owner, sort_order, sort_choice } = req.query;

    if (!offset || !limit) [offset, limit] = [0, 5];

    const timelines = await timelinesModel.getTimelines({
      offset,
      limit,
      user_id,
      owner,
      sort_order,
      sort_choice,
    });

    res.status(200).json(timelines);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const postTimeline = async (req, res) => {
  try {
    const timelineID = await timelinesModel.postTimeline(req.body);

    if (timelineID) res.status(200).json(timelineID);
    else res.status(500);
  } catch (err) {
    res.sendStatus(500);
  }
};

const postMemory = async (req, res) => {
  try {
    const sqlState = await timelinesModel.postMemory(req.body);

    if (sqlState === "00000") res.sendStatus(200);
    else if (sqlState === "23000") res.sendStatus(409);
    else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getMemories = async (req, res) => {
  try {
    const { timeline_id } = req.query;

    console.log(timeline_id);

    const memories = await timelinesModel.getMemories(timeline_id);

    if (memories.length > 0) res.status(200).json(memories);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const postTimelineVisit = async (req, res) => {
  try {
    const { visited_timeline_id, visitor_user_id } = req.body;

    console.log(visited_timeline_id, visitor_user_id);

    await timelinesModel.postTimelineVisit({
      visited_timeline_id,
      visitor_user_id,
    });

    console.log("Increasaed view count for timeline: ", visited_timeline_id);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};

const deleteTimeline = async (req, res) => {
  try {
    const timelineID = req.params.timeline_id;

    const sqlState = await timelinesModel.deleteTimeline(timelineID);

    if (sqlState === "00000") res.sendStatus(204);
  } catch (err) {
    console.log(err);
    if (sqlState === "23000") res.sendStatus(404);
    else res.sendStatus(500);
  }
};

const getTimelineViewCount = async (req, res) => {
  try {
    const { timeline_id } = req.query;

    const viewCount = await timelinesModel.getTimelineViewCount(timeline_id);

    res.status(200).json(viewCount[0].timeline_view_count);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

timelinesController.getTimelines = getTimelines;
timelinesController.postTimeline = postTimeline;
timelinesController.postMemory = postMemory;
timelinesController.getMemories = getMemories;
timelinesController.postTimelineVisit = postTimelineVisit;
timelinesController.deleteTimeline = deleteTimeline;
timelinesController.getTimelineViewCount = getTimelineViewCount;

module.exports = timelinesController;
