DROP SCHEMA IF EXISTS mws;
CREATE SCHEMA mws;
USE mws;

DROP TABLE IF EXISTS user;

CREATE TABLE user
(
  id           INT(10),
  first_name     VARCHAR(40),
  last_name     VARCHAR(40),
  g_account VARCHAR(50)
);

INSERT INTO user (id, first_name, last_name, g_account) VALUES (1, "Kohei", "Matsukawa", "k.matsukawa@dual.tokyo");
INSERT INTO user (id, first_name, last_name, g_account) VALUES (2, "Test_First_Name", "Test_Last_Name", "(Google_Account_Test)");