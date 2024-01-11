const connection = require("./connectionPool");

const usersModel = {};

const getProfilePicture = async (userID) => {
  const [data] = await connection.execute(
    `SELECT
    up.picture_data AS user_picture_data
    FROM
    users u
    LEFT JOIN
    pictures up ON u.user_picture_id = up.picture_id
    WHERE user_id = ?`,
    [userID]
  );

  return data;
};

const getUserData = async (id) => {
  try {
    const [userData] = await connection.execute(
      `SELECT user_id, picture_data, user_first_name, user_last_name from users join pictures on users.user_picture_id = pictures.picture_id WHERE user_id = ?`,
      [id]
    );
    
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
usersModel.getUserData = getUserData;
usersModel.search = search;

module.exports = usersModel;
