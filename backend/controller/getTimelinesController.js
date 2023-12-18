const getTimelinesModel = require("../models/getTimelinesModel");

const getTimelinesController = async (req, res) => {
  try {
    const amount = req.query.amount;
    const data = await getTimelinesModel(amount.toString());

    res.status(200).json(data);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = getTimelinesController;
