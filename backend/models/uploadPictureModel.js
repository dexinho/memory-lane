const pool = require("./mySqlConnection");

const uploadPictureModel = async (pictureData) => {
  try {
    await pool.execute(`INSERT INTO pictures(picture_data) VALUE(?)`, [
      pictureData,
    ]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = uploadPictureModel
