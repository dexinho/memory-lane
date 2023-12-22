const uploadModel = require("../models/uploadModel");

const uploadController = {};

const picture = async (req, res) => {
  try {
    const picturePath = req.body;
    await uploadModel.picture(picturePath);

    console.log("Picture uploaded successfully");
    res.status(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

uploadController.picture = picture;

module.exports = uploadController;
