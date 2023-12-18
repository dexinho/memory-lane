const uploadPictureModel = require('../models/uploadPictureModel')

const uploadPictureController = async (req, res) => {
  try {
    const picturePath = req.file.path;
    await uploadPictureModel(picturePath);
    res.status(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = uploadPictureController;