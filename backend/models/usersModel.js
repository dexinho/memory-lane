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

const data = async (id) => {
  try {
    // let query = `SELECT user_id, picture_data, user_first_name, user_last_name from users join pictures on users.user_picture_id = pictures.picture_id`;

    // const params = [];

    // console.log(id)

    // if (id) {
    //   query += " WHERE user_id = ?";
    //   params.push(id);
    // }

    // const [userData] = await connection.execute(query, params);

    console.log("id", id);

    const [userData] = await connection.execute(
      `SELECT user_id, picture_data, user_first_name, user_last_name from users join pictures on users.user_picture_id = pictures.picture_id WHERE user_id = ?`,
      [id]
    );

    console.log(userData);

    return userData[0];
  } catch (err) {
    console.log(err);
  }
};

const search = async (query) => {
  try {
    const [userData] = await connection.execute(
      `SELECT user_id, user_first_name, user_last_name, picture_data 
    FROM users join pictures
    on users.user_picture_id = pictures.picture_id
    where CONCAT(user_first_name, ' ', user_last_name) LIKE ?`,
      [`%${query}%`]
    );

    return userData;
  } catch (err) {
    console.log(err);
  }
};

usersModel.getProfilePicture = getProfilePicture;
usersModel.data = data;
usersModel.search = search;

module.exports = usersModel;
