DROP SCHEMA IF EXISTS mws;
CREATE SCHEMA mws;
USE mws;

DROP TABLE IF EXISTS user;

/*ユーザー*/
CREATE TABLE user
(
  `user_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ユーザーID',
  `first_name` VARCHAR(40),
  `last_name` VARCHAR(40),
  `g_account` VARCHAR(50),
  `last_login_date` DATE NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*タスク*/
DROP TABLE IF EXISTS task;
CREATE TABLE task
(
  `task_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'タスクID',
  `team_id` int unsigned,
  `user_id` int unsigned,
  `task_name` VARCHAR(50),
  `position_index` int unsigned NOT NULL,
  `task_date` DATE NOT NULL,

  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS task_detail;
CREATE TABLE task_detail
(
  `task_id` int unsigned NOT NULL COMMENT 'タスクID',
  `task_detail` VARCHAR(1023) COMMENT 'タスク内容',
  `task_point` INT(3) NOT NULL DEFAULT 0,

  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS task_tag;
CREATE TABLE task_tag
(
  `task_tag_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'タスクタグID',
  `task_id` int unsigned NOT NULL,
  `task_tag_name` VARCHAR(50) NOT NULL,
  `task_tag_point` INT(3) NOT NULL,

  PRIMARY KEY (`task_tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS task_index;
CREATE TABLE task_index
(
  `task_index_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'タスク指標ID',
  `task_id` int unsigned NOT NULL,
  `task_index_name` VARCHAR(50) NOT NULL,
  `task_index_point` INT(3) NOT NULL,
  PRIMARY KEY (`task_index_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*データ挿入*/
/*ユーザー*/
INSERT INTO user (user_id, first_name, last_name, g_account, last_login_date) VALUES (1, "Kohei", "Matsukawa", "k.matsukawa@dual.tokyo",NOW());
INSERT INTO user (user_id, first_name, last_name, g_account, last_login_date) VALUES (2, "Test_First_Name", "Test_Last_Name", "(Google_Account_Test)",NOW());

/*タスク*/
INSERT INTO task (task_id, team_id, user_id,task_name,position_index,task_date) VALUES (1, NULL, 1, "タスクテスト１", 1,NOW());
INSERT INTO task (task_id, team_id, user_id, task_name,position_index,task_date) VALUES (2, NULL, 1, "タスクテスト２", 2,NOW());
INSERT INTO task (task_id, team_id, user_id, task_name,position_index,task_date) VALUES (3, NULL, 1, "タスクテスト３", 3,NOW());

INSERT INTO task_detail (task_id, task_detail, task_point) VALUES (1, "現在の開発状況をまとめる",0);
INSERT INTO task_detail (task_id, task_detail, task_point) VALUES (2, "フロントエンドのタスク管理部分のデザインを調整する。\n 明後日までには完了したいです。 \n 優先度的には２番目です。",0);
INSERT INTO task_detail (task_id, task_detail, task_point) VALUES (3, "ログイン画面の実装をする。\n 数日で完了予定。\n\n Googleアカウントを使いたいです。",0);