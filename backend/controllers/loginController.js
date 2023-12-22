const loginModel = require("../models/loginModel");

const loginController = {};

const validate = async (req, res) => {
  try {
    const { email_input, password_input } = req.body;
    console.log("controller", email_input, password_input);
    const userData = await loginModel.validate({
      email_input,
      password_input,
    });

    console.log("validateLoginController", userData);

    if (userData) res.sendStatus(200);
    else res.sendStatus(400);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};


loginController.validate = validate;

module.exports = loginController;
