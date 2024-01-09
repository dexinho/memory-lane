const timelinesModel = require("../models/timelinesModel");

timelinesController = {};

const getTimelines = async (req, res) => {
  try {
    const amount = req.query?.amount;
    const timelines = await timelinesModel.getTimelines(amount);

    res.status(200).json(timelines);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const postTimeline = async (req, res) => {
  console.log(req.body);
  try {
    const timelineID = await timelinesModel.postTimeline(req.body);

    if (timelineID) res.status(200).json(timelineID);
    else res.status(500);
  } catch (err) {
    res.sendStatus(500);
  }
};

const addMemory = async (req, res) => {
  try {
    const sqlState = await timelinesModel.addMemory(req.body);

    if (sqlState === "00000") res.sendStatus(200);
    else if (sqlState === "23000") res.sendStatus(409);
    else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

timelinesController.getTimelines = getTimelines;
timelinesController.postTimeline = postTimeline;
timelinesController.addMemory = addMemory;

module.exports = timelinesController;
