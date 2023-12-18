const connection = require('./mySqlConnection')

const getTimelinesModel = async (amount) => {
  try {
    console.log(amount);
    const [timelines] = await connection.execute(
      `SELECT timeline_id, timeline_title, background_color, font_color, font_family, is_public, timeline_owner_id, view_count, date_created, date_updated, picture_url, first_name, last_name 
      FROM timelines join users on timelines.timeline_owner_id = users.user_id join pictures on pictures.picture_id = timelines.timeline_piture_id 
      LIMIT ?`,
      [amount]
    );

    console.log(timelines);

    return timelines;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getTimelinesModel;
