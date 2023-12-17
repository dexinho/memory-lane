const connection = require("./sqlPool");

const validateLoginModel = async ({ email_input, password_input }) => {
  console.log("validateLoginModel", email_input, password_input);
  const [data] = await connection.execute(
    `SELECT user_picture_id, first_name, last_name FROM users where email = ? AND password_hash = ?`,
    [email_input, password_input]
  );

  if (data.length > 0) return data;
};

module.exports = validateLoginModel;
