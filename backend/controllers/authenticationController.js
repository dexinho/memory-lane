const authenticationModel = require("../models/authenticationModel");
const authenticationController = {};

const validate = async (req, res) => {
  try {
    const userData = await authenticationModel.validate(req.body);

    console.log("validateLoginController", userData);

    if (userData) res.sendStatus(200);
    else res.sendStatus(400);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  console.log(req.body);
  try {
    const sqlState = await authenticationModel.register(req.body);

    console.log(sqlState)

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
