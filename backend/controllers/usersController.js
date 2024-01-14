const usersModel = require("../models/usersModel");

usersController = {};

const getProfilePicture = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) throw new Error("No id provided!");

    const [picture] = await usersModel.getProfilePicture(user_id);

    res.status(200).json(picture);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getUserData = async (req, res) => {
  try {
    const { user_id } = req.query;
    const data = await usersModel.getUserData(user_id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const search = async (req, res) => {
  try {
    const { query } = req.query;

    const userData = await usersModel.search(query);
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

usersController.getProfilePicture = getProfilePicture;
usersController.getUserData = getUserData;
usersController.search = search;

module.exports = usersController;
