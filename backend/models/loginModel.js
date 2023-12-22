const connection = require("./connectionPool");

const loginModel = {};

const validate = async ({ email_input, password_input }) => {
  const [data] = await connection.execute(
    `SELECT user_id FROM users where user_email = ? AND user_password_hash = ?`,
    [email_input, password_input]
  );

  if (data.length > 0) return data[0];
};

loginModel.validate = validate;

module.exports = loginModel;
