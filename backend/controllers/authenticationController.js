const authenticationModel = require("../models/authenticationModel");
const authenticationController = {};

const validate = async (req, res) => {
  try {
    const userID = await authenticationModel.validate(req.body);

    if (userID) res.status(200).json(userID);
    else res.sendStatus(400);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  try {
    const sqlState = await authenticationModel.register(req.body);

    if (sqlState === "00000") res.sendStatus(200);
    else if (sqlState === "23000") res.sendStatus(409);
    else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

authenticationController.validate = validate;
authenticationController.register = register;

module.exports = authenticationController;
