const getTimelinesModel = require('../models/getTimelinesModel')

const getTimelinesController = async (req, res) => {
  const data = await getTimelinesModel()
}

module.exports = getTimelinesController