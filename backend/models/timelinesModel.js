const connection = require("./connectionPool");

timelinesModel = {};

const getTimelines = async ({
  offset,
  limit,
  id = null,
  owner = null,
  sortOrder,
  sortChoice,
}) => {
  console.log(offset, limit, id, owner, sortChoice, sortOrder);

  if (sortChoice === "updated") sortChoice = "timeline_date_updated"
  else if (sortChoice === "views") sortChoice = "timeline_view_count"

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
      WHERE 
          (t.timeline_owner_id = ? AND ? IS NOT NULL)
          OR 
          (t.timeline_is_public = 1 AND ? IS NULL)
          OR 
          (t.timeline_owner_id = ? AND ? IS NOT NULL AND t.timeline_is_public = 1)
      ORDER BY ${sortChoice} ${sortOrder}
      LIMIT ?, ?`,
      [id, owner, id, id, id, offset, limit]
    );

    return timelines;
  } catch (err) {
    console.log(err);
  }
};

const postTimeline = async ({
  timeline_owner_id,
  timeline_title,
  timeline_background_color,
  timeline_font_color,
  timeline_font_family,
  timeline_is_public,
}) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO timelines(timeline_owner_id, timeline_title, timeline_background_color, timeline_font_color, timeline_font_family, timeline_is_public, timeline_picture_id, timeline_date_created, timeline_date_updated) 
      values (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE(), CURRENT_DATE())`,
      [
        timeline_owner_id,
        timeline_title,
        timeline_background_color,
        timeline_font_color,
        timeline_font_family,
        timeline_is_public === "on",
        1,
      ]
    );

    return result.insertId;
  } catch (err) {
    console.log(err);
    if (err.sqlState === "23000") return "23000";

    return;
  }
};

const addMemory = async ({
  memory_timeline_id,
  memory_description,
  memory_picture_id,
}) => {
  try {
    await connection.execute(
      `INSERT INTO memories(memory_date, memory_picture_id, memory_timeline_id, memory_description) 
      VALUES(CURRENT_DATE(), ?, ?, ?)`,
      [memory_picture_id, memory_timeline_id, memory_description]
    );

    return "00000";
  } catch (err) {
    console.log(err);
    if (err.sqlState === "23000") return "23000";

    return;
  }
};

timelinesModel.getTimelines = getTimelines;
timelinesModel.postTimeline = postTimeline;
timelinesModel.addMemory = addMemory;

module.exports = timelinesModel;
