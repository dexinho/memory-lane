const pool = require("./connectionPool");

const uploadModel = {};

const picture = async (pictureData) => {
  try {
    await pool.execute(`INSERT INTO pictures(picture_data) VALUE(?)`, [
      pictureData,
    ]);
  } catch (err) {
    console.log(err);
  }
};

uploadModel.picture = picture;

module.exports = uploadModel;
