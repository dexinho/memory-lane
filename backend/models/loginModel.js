const connection = require("./connectionPool");

const loginModel = {};

const validateLoginModel = async ({ email_input, password_input }) => {
  const [data] = await connection.execute(
    `SELECT user_id FROM users where email = ? AND password_hash = ?`,
    [email_input, password_input]
  );

  if (data.length > 0) return data[0];
};

const loggedUserDataModel = async () => {
  try {
    const [userData] = await connection.execute(
      `SELECT user_id, picture_data, first_name, last_name from users join pictures on users.user_picture_id = pictures.picture_id`
    );

    console.log('loggedUserDataModel', userData);

    return userData[0];
  } catch (err) {
    console.log(err);
  }
};

loginModel.validateLoginModel = validateLoginModel;
loginModel.loggedUserDataModel = loggedUserDataModel;

module.exports = loginModel;
