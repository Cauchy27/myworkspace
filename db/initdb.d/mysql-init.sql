DROP SCHEMA IF EXISTS mws;
CREATE SCHEMA mws;
USE mws;

DROP TABLE IF EXISTS user;

/*ユーザー*/
CREATE TABLE user
(
  `user_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ユーザーID',
  `user_name` VARCHAR(40),
  `login_id` VARCHAR(50),
  `token` VARCHAR(255),
  `last_login_date` DATE NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE(`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS team;

/*チーム*/
CREATE TABLE team
(
  `team_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ユーザーID',
  `team_name` VARCHAR(40),
  PRIMARY KEY (`team_id`),
  UNIQUE(`team_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*タスク*/
DROP TABLE IF EXISTS task;
CREATE TABLE task
(
  `task_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'タスクID',
  `team_id` int unsigned,
  `user_id` int unsigned,
  `task_name` VARCHAR(50),
  `position_index` int unsigned ,
  `task_date` DATE NOT NULL,
  `task_tag_id` int unsigned,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS task_detail;
CREATE TABLE task_detail
(
  `task_id` int unsigned NOT NULL COMMENT 'タスクID',
  `task_detail` VARCHAR(1023) COMMENT 'タスク内容',
  `task_point` INT(3) DEFAULT 0,

  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS task_tag;
CREATE TABLE task_tag
(
  `task_tag_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'タスクタグID',
  `user_id` int unsigned NOT NULL,
  `task_tag_name` VARCHAR(50) NOT NULL,

  PRIMARY KEY (`task_tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS task_index;
CREATE TABLE task_index
(
  `task_index_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'タスク指標ID',
  `task_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `task_index_name` VARCHAR(50) NOT NULL,
  `task_index_point` INT(3) NOT NULL,
  PRIMARY KEY (`task_index_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*メニュー*/
DROP TABLE IF EXISTS menu;
CREATE TABLE menu
(
  `menu_id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int unsigned,
  `menu_name` VARCHAR(50),
  `menu_active` int unsigned,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*出力設定*/
DROP TABLE IF EXISTS output_config;
CREATE TABLE output_config
(
  `output_config_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `outer_tag_start` VARCHAR(50),
  `outer_tag_end` VARCHAR(50),
  `title` VARCHAR(50),
  `header_today` VARCHAR(50),
  `header_tomorrow` VARCHAR(50),
  `indent` VARCHAR(50),
  `delimiter` VARCHAR(50),
  `date_checked` TINYINT(1) DEFAULT NULL,
  `progress_checked` TINYINT(1) DEFAULT NULL,
  PRIMARY KEY (`output_config_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*データ挿入*/
/*チーム*/
INSERT INTO team (team_id, team_name) VALUES (1, "default_team");

/*メニュー*/
INSERT INTO menu (menu_id,team_id,menu_name,menu_active) VALUES (1, 1, "メニュー１",1);
INSERT INTO menu (menu_id,team_id,menu_name,menu_active) VALUES (2, 1, "メニュー２",1);
INSERT INTO menu (menu_id,team_id,menu_name,menu_active) VALUES (3, 1, "メニュー３",1);