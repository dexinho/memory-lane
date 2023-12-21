const pool = require("./connectionPool");

const picturesModel = {};

const uploadPictureModel = async (pictureData) => {
  try {
    await pool.execute(`INSERT INTO pictures(picture_data) VALUE(?)`, [
      pictureData,
    ]);
  } catch (err) {
    console.log(err);
  }
};

picturesModel.uploadPictureModel = uploadPictureModel;

module.exports = picturesModel;
