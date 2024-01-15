drop database memory_lane;

INSERT INTO users (user_picture_id, user_email, user_password_hash, user_first_name, user_last_name) VALUES
    (2, 'enes@gmail.com', '123', 'Enes', 'Alomerovic');
INSERT INTO users (user_picture_id, user_email, user_password_hash, user_first_name, user_last_name) VALUES
    (3, 'jasmin@gmail.com', '123', 'Jasmin', 'Hidanovic');
    

INSERT INTO timelines(timeline_owner_id, timeline_picture_id, timeline_date_created, timeline_date_updated, timeline_is_public, timeline_view_count) values (1, 4, NOW(), NOW(), 1, 15);
INSERT INTO timelines(timeline_owner_id, timeline_picture_id, timeline_date_created, timeline_date_updated, timeline_is_public, timeline_view_count) values (1, 3, NOW(), NOW(), 1, 10);

INSERT INTO memories(memory_date, memory_picture_id, memory_timeline_id, memory_description) values("2024-02-02", 2, 75, 'hi there');
select * from timelines;
select * from memories;
select * from users;
select * from timeline_visits;

SELECT memory_id, memory_date, picture_data, memory_description FROM memories join pictures
on memories.memory_picture_id = pictures.picture_id where memory_timeline_id = 90;

SELECT
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
      ORDER BY timeline_view_count DESC, timeline_date_updated DESC
      LIMIT 0, 3;

delete from timelines where timeline_id > 4;

alter table memories
drop column memory_picture_name;

SELECT user_id, user_first_name, user_last_name, picture_data FROM users join pictures
on users.user_picture_id = pictures.picture_id
where user_first_name LIKE "%j%";

SELECT user_id, user_first_name, user_last_name, picture_data 
    FROM users join pictures
    on users.user_picture_id = pictures.picture_id
    where CONCAT(user_first_name, ' ', user_last_name) LIKE 'elaine %';

delete from users
where user_id > 3 and user_id < 999;

SELECT
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
  ORDER BY t.timeline_id desc;

drop trigger update_timeline_date;
insert into memories (memory_date, memory_timeline_id) value ('2022-11-11', 2);
