drop database memory_lane;

INSERT INTO users (user_picture_id, user_email, user_password_hash, user_first_name, user_last_name) VALUES
    (2, 'enes@gmail.com', '123', 'Enes', 'Alomerovic');
INSERT INTO users (user_picture_id, user_email, user_password_hash, user_first_name, user_last_name) VALUES
    (3, 'jasmin@gmail.com', '123', 'Jasmin', 'Hidanovic');
    
    
INSERT INTO timelines(timeline_owner_id, timeline_picture_id, timeline_date_created, timeline_date_updated) values (2, 3, CURRENT_DATE(), CURRENT_DATE());
INSERT INTO timelines(timeline_owner_id, timeline_picture_id, timeline_date_created, timeline_date_updated) values (2, 4, CURRENT_DATE(), CURRENT_DATE());
INSERT INTO timelines(timeline_owner_id, timeline_picture_id, timeline_date_created, timeline_date_updated) values (1, 5, CURRENT_DATE(), CURRENT_DATE());
INSERT INTO timelines(timeline_owner_id, timeline_picture_id, timeline_date_created, timeline_date_updated) values (1, 6, CURRENT_DATE(), CURRENT_DATE());

select * from pictures;

delete from users
where user_id in (15, 16);

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
