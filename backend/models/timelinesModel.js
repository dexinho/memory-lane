const connection = require("./connectionPool");

timelinesModel = {};

const getTimelines = async (amount = "5") => {
  try {
    const [timelines] = await connection.execute(
      `SELECT
      t.timeline_id,
      t.timeline_title,
      u.user_first_name,
      u.user_last_name,
      t.timeline_background_color,
      t.timeline_font_color,
      t.timeline_font_family,
      t.timeline_is_public,
      t.timeline_owner_id,
      t.timeline_view_count,
      t.timeline_date_created,
      t.timeline_date_updated,
      tp.picture_data AS timeline_picture_data
  FROM
      timelines t
  JOIN
      pictures tp ON t.timeline_picture_id = tp.picture_id
  JOIN users u ON u.user_id = t.timeline_owner_id
  ORDER BY t.timeline_id desc
      LIMIT ?`,
      [amount]
    );

    console.log(timelines)

    return timelines;
  } catch (err) {
    console.log(err);
  }
};

timelinesModel.getTimelines = getTimelines;

module.exports = timelinesModel;
