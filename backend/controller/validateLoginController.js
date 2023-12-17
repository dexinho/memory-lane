const validateLoginModel = require("../models/validateLoginModel");

const validateLoginController = async (req, res) => {
  try {
    const { email_input, password_input } = req.body;
    console.log("controller", email_input, password_input);
    const userData = await validateLoginModel({ email_input, password_input });
    console.log(userData)

    if (userData) res.status(200).json(userData[0]);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = validateLoginController;
