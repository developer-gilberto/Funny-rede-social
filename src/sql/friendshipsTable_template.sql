CREATE TABLE friendships (
    id_user INT NOT NULL,
    id_friend INT NOT NULL,
    friendship BOOLEAN,
    friendship_date VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (id_user, id_friend),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_friend) REFERENCES users(id_user)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;