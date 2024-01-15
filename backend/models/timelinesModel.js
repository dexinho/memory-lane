const connection = require("./connectionPool");

timelinesModel = {};

const getTimelines = async ({
  offset,
  limit,
  user_id = null,
  owner = null,
  sort_order,
  sort_choice,
}) => {
  console.log(offset, limit, user_id, owner, sort_choice, sort_order);

  if (sort_choice === "updated") sort_choice = "timeline_date_updated";
  else if (sort_choice === "views") sort_choice = "timeline_view_count";

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
      ORDER BY ${sort_choice} ${sort_order}
      LIMIT ?, ?`,
      [user_id, owner, user_id, user_id, user_id, offset, limit]
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
  timeline_view_count,
}) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO timelines(timeline_owner_id, timeline_title, timeline_background_color, timeline_font_color, timeline_font_family, timeline_is_public, timeline_picture_id, timeline_date_created, timeline_date_updated, timeline_view_count) 
      values (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE(), CURRENT_DATE(), ?)`,
      [
        timeline_owner_id,
        timeline_title,
        timeline_background_color,
        timeline_font_color,
        timeline_font_family,
        timeline_is_public === "on",
        1,
        timeline_view_count,
      ]
    );

    console.log('timeline_view_count', timeline_view_count)

    return result.insertId;
  } catch (err) {
    console.log(err);
    if (err.sqlState === "23000") return "23000";

    return;
  }
};

const postMemory = async ({
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

const getMemories = async (timeline_id) => {
  try {
    const [memories] = await connection.execute(
      `SELECT memory_id, timeline_owner_id, memory_date, picture_data, memory_description 
      FROM memories JOIN pictures ON memories.memory_picture_id = pictures.picture_id 
      JOIN timelines on timelines.timeline_id = memories.memory_timeline_id
      WHERE memory_timeline_id = ?`,
      [timeline_id]
    );

    return memories;
  } catch (err) {
    console.log(err);

    return;
  }
};

const postTimelineVisit = async ({ visited_timeline_id, visitor_user_id }) => {
  try {
    console.log(visited_timeline_id, visitor_user_id);
    await connection.execute(
      `INSERT INTO timeline_visits (timeline_visit_timeline_id, timeline_visit_user_id)
      VALUES (?, ?)`,
      [visited_timeline_id, visitor_user_id]
    );

    return;
  } catch (err) {
    console.log(err);

    return;
  }
};

const deleteTimeline = async (timelineID) => {
  try {
    const [rows] = await connection.execute(
      `DELETE FROM timelines WHERE
   timeline_id = ?`,
      [timelineID]
    );

    console.log(`${rows.affectedRows} row(s) deleted`);

    return "00000";
  } catch (err) {
    console.log("Error deleting row:", err.message);
    return "23000";
  }
};

const getTimelineViewCount = async (timelineID) => {
  try {
    const [viewCount] = await connection.execute(
      `SELECT timeline_view_count FROM timelines
where timeline_id = ?`,
      [timelineID]
    );

    return viewCount
  } catch (err) {
    console.log("Error getting view count:", err.message);
    return "23000";
  }
};

timelinesModel.getTimelines = getTimelines;
timelinesModel.postTimeline = postTimeline;
timelinesModel.postMemory = postMemory;
timelinesModel.getMemories = getMemories;
timelinesModel.postTimelineVisit = postTimelineVisit;
timelinesModel.getTimelineViewCount = getTimelineViewCount;
timelinesModel.deleteTimeline = deleteTimeline;

module.exports = timelinesModel;
