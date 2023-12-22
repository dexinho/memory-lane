create database memory_lane;
use memory_lane; 

CREATE TABLE pictures (
    picture_id INT PRIMARY KEY AUTO_INCREMENT,
    picture_data LONGBLOB
);

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_picture_id INT,
    user_email VARCHAR(30) UNIQUE,
    user_password_hash VARCHAR(255),
    user_first_name VARCHAR(30),
    User_last_name VARCHAR(30),
    FOREIGN KEY (user_picture_id)
        REFERENCES pictures (picture_id)
);


CREATE TABLE timelines (
    timeline_id INT PRIMARY KEY AUTO_INCREMENT,
    timeline_title VARCHAR(40) default 'timeline',
    timeline_background_color VARCHAR(20) default '#BDC23D',
    timeline_font_color VARCHAR(20) default 'black',
    timeline_font_family VARCHAR(30) default 'sans-serif',
    timeline_is_public BOOLEAN DEFAULT FALSE,
    timeline_owner_id INT,
    timeline_picture_id INT,
    timeline_view_count INT DEFAULT 0,
    timeline_date_created DATE,
    timeline_date_updated DATE,
    FOREIGN KEY (timeline_owner_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (timeline_picture_id)
        REFERENCES pictures (picture_id)
        ON DELETE CASCADE
);

CREATE TABLE timeline_visits (
    timeline_visit_id INT PRIMARY KEY AUTO_INCREMENT,
    timeline_visit_timeline_id INT,
    timeline_visit_user_id INT,
    FOREIGN KEY (timeline_visit_timeline_id)
        REFERENCES timelines (timeline_id)
        ON DELETE CASCADE,
    FOREIGN KEY (timeline_visit_user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE memories (
    memory_id INT PRIMARY KEY AUTO_INCREMENT,
    memory_date DATE,
    memory_picture_name VARCHAR(30),
    memory_picture_id INT,
    memory_timeline_id INT,
    description TEXT,
    FOREIGN KEY (memory_timeline_id)
        REFERENCES timelines (timeline_id)
        ON DELETE CASCADE,
    FOREIGN KEY (memory_picture_id)
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
    timeline_view_count = timeline_view_count + 1
WHERE
    timeline_id = NEW.timeline_visit_timeline_id
    AND NEW.timeline_visit_user_id <> timeline_owner_id;

END // 
DELIMITER ;

CREATE 
    TRIGGER  update_timeline_date
 AFTER INSERT ON memories FOR EACH ROW 
    UPDATE timeline SET timeline_date_updated = CURRENT_DATE() WHERE
        timeline_id = NEW.memory_timeline_id;

CREATE 
    TRIGGER  update_current_timeline_picture
 AFTER INSERT ON memories FOR EACH ROW 
    UPDATE timelines SET timeline_picture_id = new.memory_picture_id WHERE
        timeline_id = new.memory_timeline_id
            AND new.memory_picture_id IS NOT NULL;