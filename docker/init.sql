CREATE DATABASE IF NOT EXISTS db_funny
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_funny;

CREATE TABLE IF NOT EXISTS users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) DEFAULT NULL,
  creation_date VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS pubs (
  id_pub INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  text_pub TEXT DEFAULT NULL,
  img_pub VARCHAR(255) DEFAULT NULL,
  date_pub VARCHAR(50) NOT NULL,

  CONSTRAINT fk_pubs_user
    FOREIGN KEY (id_user)
    REFERENCES users(id_user)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS friendships (
  id_user INT NOT NULL,
  id_friend INT NOT NULL,
  friendship BOOLEAN DEFAULT FALSE,
  friendship_date VARCHAR(50) DEFAULT NULL,

  PRIMARY KEY (id_user, id_friend),

  CONSTRAINT fk_friend_user
    FOREIGN KEY (id_user)
    REFERENCES users(id_user)
    ON DELETE CASCADE,

  CONSTRAINT fk_friend_friend
    FOREIGN KEY (id_friend)
    REFERENCES users(id_user)
    ON DELETE CASCADE
);
