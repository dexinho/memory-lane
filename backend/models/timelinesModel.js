const connection = require("./connectionPool");

timelinesModel = {};

const getTimelinesModel = async (amount = "5") => {
  try {
    console.log(amount);
    const [timelines] = await connection.execute(
      `SELECT timeline_id, timeline_title, background_color, font_color, font_family, is_public, timeline_owner_id, view_count, date_created, date_updated, picture_data, first_name, last_name 
      FROM timelines join users on timelines.timeline_owner_id = users.user_id join pictures on pictures.picture_id = timelines.timeline_picture_id 
      LIMIT ?`,
      [amount]
    );

    console.log("getTimelinesModel", timelines);

    return timelines[0];
  } catch (err) {
    console.log(err);
  }
};

timelinesModel.getTimelinesModel = getTimelinesModel;

module.exports = timelinesModel;
