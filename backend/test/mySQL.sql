-- drop database memory_lane;
-- create database memory_lane;
-- use memory_lane; 
CREATE TABLE pictures (
    picture_id INT PRIMARY KEY AUTO_INCREMENT,
    picture_url VARCHAR(255) UNIQUE
);

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_picture_id INT,
    email VARCHAR(30) UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (user_picture_id)
        REFERENCES pictures (picture_id)
);

CREATE TABLE timelines (
    timeline_id INT PRIMARY KEY AUTO_INCREMENT,
    timeline_title VARCHAR(40),
    background_color VARCHAR(20),
    font_color VARCHAR(20),
    font_family VARCHAR(30),
    is_public BOOLEAN DEFAULT FALSE,
    timeline_owner_id INT,
    view_count INT DEFAULT 0,
    date_created DATE,
    date_updated DATE,
    FOREIGN KEY (timeline_owner_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

-- insert into users(user_id) value (1);
-- insert into timelines(timeline_title, timeline_owner_id, view_count) values('prvi', 1, 0);
-- insert into timeline_visits(timeline_id, visitor_user_id) values(1, 3);
-- select * from users;
CREATE TABLE timeline_visits (
    visit_id INT PRIMARY KEY AUTO_INCREMENT,
    timeline_id INT,
    visitor_user_id INT,
    FOREIGN KEY (timeline_id)
        REFERENCES timelines (timeline_id)
        ON DELETE CASCADE,
    FOREIGN KEY (visitor_user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE memories (
    memory_id INT PRIMARY KEY AUTO_INCREMENT,
    memory_date DATE,
    picture_name VARCHAR(30),
    picture_id INT,
    timeline_id INT,
    description TEXT,
    FOREIGN KEY (timeline_id)
        REFERENCES timelines (timeline_id)
        ON DELETE CASCADE,
    FOREIGN KEY (picture_id)
        REFERENCES pictures (picture_id)
        ON DELETE CASCADE
);

DELIMITER // 
CREATE TRIGGER increase_view_count
AFTER
INSERT
    ON timeline_visits FOR EACH ROW BEGIN
UPDATE
    timelines
SET
    view_count = view_count + 1
WHERE
    timeline_id = NEW.timeline_id
    AND NEW.visitor_user_id <> timeline_owner_id;

END // 
DELIMITER ;

delimiter //
CREATE TRIGGER update_timeline_date
AFTER INSERT ON memories
FOR EACH ROW
BEGIN
    UPDATE timeline
    SET date_updated = CURRENT_DATE()
    WHERE timeline_id = NEW.timeline_id;
END //
delimiter ;

-- drop trigger update_timeline_date;
-- insert into timelines (date_created) value (CURRENT_DATE());
-- insert into memories (memory_date, timeline_id) value ('2022-11-11', 2);
-- select * from timelines;
-- select * from memories;
-- drop trigger increase_view_count;