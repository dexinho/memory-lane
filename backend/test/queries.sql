drop database memory_lane;
create database memory_lane;
use memory_lane; 

INSERT INTO users (user_picture_id, email, password_hash, first_name, last_name) VALUES
    (1, 'test@gmail.com', '123', 'Jasmin', 'Hidanovic');
insert into timelines(timeline_owner_id, timeline_picture_id, date_created, date_updated) values (1, 1, CURRENT_DATE(), CURRENT_DATE());

-- SELECT timeline_id, timeline_title, background_color, font_color, font_family, is_public, timeline_owner_id, view_count, date_created, date_updated, picture_url, first_name, last_name 
-- FROM timelines join users on timelines.timeline_owner_id = users.user_id 
-- join pictures on pictures.picture_id = 
-- LIMIT ?

drop trigger update_timeline_date;
insert into timelines (date_created) value (CURRENT_DATE());
insert into memories (memory_date, timeline_id) value ('2022-11-11', 2);
SELECT 
    *
FROM
    timelines;
SELECT 
    *
FROM
    users;
SELECT 
    *
FROM
    pictures;
drop trigger increase_view_count;