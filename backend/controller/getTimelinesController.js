const getTimelinesModel = require("../models/getTimelinesModel");

const getTimelinesController = async (req, res) => {
  try {
    const amount = req.query.amount;
    const data = await getTimelinesModel(amount.toString());

    if (data.length > 0) {
      res.status(200).json(data);
    } else res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = getTimelinesController;
