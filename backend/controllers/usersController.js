const usersModel = require("../models/usersModel");

usersController = {};

const getProfilePicture = async (req, res) => {
  try {
    const pictures = await usersModel.getProfilePicture();
    const finalData = {};

    console.log("pictures", pictures);

    pictures.forEach((picture) => {
      finalData[picture.user_id] = picture.user_picture_data;
    });

    res.status(200).json(finalData);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const data = async (req, res) => {
  try {
    const email = req.query?.email;
    const data = await usersModel.data(email);
    console.log("loggedUserDataController", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const search = async (req, res) => {
  try {
    const query = req.query?.q;

    const userData = await usersModel.search(query);
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

usersController.getProfilePicture = getProfilePicture;
usersController.data = data;
usersController.search = search;

module.exports = usersController;
