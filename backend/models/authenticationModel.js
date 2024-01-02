const connection = require("./connectionPool");
const customHash = require("../utils/customHash");

const authenticationModel = {};

const validate = async ({ email_input, password_input }) => {
  const hash = customHash(password_input, email_input);

  const [data] = await connection.execute(
    `SELECT user_id FROM users where user_email = ? AND user_password_hash = ?`,
    [email_input, hash]
  );

  if (data.length > 0) return data[0];
};

const register = async ({
  email_input_r,
  password_input_r,
  first_name_input_r,
  last_name_input_r,
}) => {
  try {
    const hash = customHash(password_input_r, email_input_r);

    await connection.execute(
      `INSERT INTO users (user_email, user_password_hash, user_first_name, user_last_name) VALUES (?, ?, ?, ?)`,
      [email_input_r, hash, first_name_input_r, last_name_input_r]
    );

    return "00000";
  } catch (err) {
    if (err.sqlState === "23000") return "23000";
    else return;
  }
};

authenticationModel.validate = validate;
authenticationModel.register = register;

module.exports = authenticationModel;
