const connection = require("./connectionPool");

const usersModel = {};

const getProfilePicture = async () => {
  const [data] = await connection.execute(`SELECT
    u.user_id,
    u.user_email,
    u.user_password_hash,
    u.user_first_name,
    u.user_last_name,
    up.picture_data AS user_picture_data
    FROM
    users u
    LEFT JOIN
    pictures up ON u.user_picture_id = up.picture_id`);

  return data;
};

const data = async (email) => {
  try {
    let query = `SELECT user_id, picture_data, user_first_name, user_last_name from users join pictures on users.user_picture_id = pictures.picture_id`;

    const params = [];

    if (email) {
      query += " WHERE user_email = ?";
      params.push(email);
    }

    const [userData] = await connection.execute(query, params);

    console.log("loggedUserDataModel", userData);

    return userData[0];
  } catch (err) {
    console.log(err);
  }
};

usersModel.getProfilePicture = getProfilePicture;
usersModel.data = data;

module.exports = usersModel;
