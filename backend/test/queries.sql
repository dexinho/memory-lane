-- drop database memory_lane;
-- create database memory_lane;
-- use memory_lane; 

-- INSERT INTO users (user_picture_id, email, password_hash, first_name, last_name) VALUES
--     (1, 'user1@example.com', 'hashedpassword1', 'John', 'Doe'),
--     (2, 'user2@example.com', 'hashedpassword2', 'Alice', 'Smith'),
--     (3, 'user3@example.com', 'hashedpassword3', 'Bob', 'Johnson');

-- insert into users(user_id) value (1);
-- insert into timelines(timeline_title, timeline_owner_id, view_count) values('prvi', 1, 0);
-- insert into timeline_visits(timeline_id, visitor_user_id) values(1, 3);
-- select * from users;

-- SELECT timeline_id, timeline_title, background_color, font_color, font_family, is_public, timeline_owner_id, view_count, date_created, date_updated, picture_url, first_name, last_name 
-- FROM timelines join users on timelines.timeline_owner_id = users.user_id 
-- join pictures on pictures.picture_id = 
-- LIMIT ?

-- drop trigger update_timeline_date;
-- insert into timelines (date_created) value (CURRENT_DATE());
-- insert into memories (memory_date, timeline_id) value ('2022-11-11', 2);
-- select * from timelines;
-- select * from memories;
-- drop trigger increase_view_count;