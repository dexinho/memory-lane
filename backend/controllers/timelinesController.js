const timelinesModel = require("../models/timelinesModel");

timelinesController = {};

const getTimelines = async (req, res) => {
  try {
    const amount = req.query?.amount;
    const timelines = await timelinesModel.getTimelines(amount);

    // console.log("Timelines", timelines);

    res.status(200).json(timelines);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

timelinesController.getTimelines = getTimelines;

module.exports = timelinesController;
