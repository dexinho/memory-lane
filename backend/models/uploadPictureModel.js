const pool = require("./mySqlConnection");

const uploadPictureModel = async (picturePath) => {
  try {
    await pool.execute(`INSERT INTO pictures(picture_url) VALUE(?)`, [
      picturePath,
    ]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = uploadPictureModel
