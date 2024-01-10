const connection = require("./connectionPool");

const uploadModel = {};

const picture = async (pictureData) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO pictures(picture_data) VALUE(?)`,
      [pictureData]
    );

    console.log('result.insertId', result.insertId)

    return result.insertId;
  } catch (err) {
    console.log(err);
  }
};

uploadModel.picture = picture;

module.exports = uploadModel;
