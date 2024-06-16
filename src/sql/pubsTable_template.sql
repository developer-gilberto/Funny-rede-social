CREATE TABLE pubs (
    id_pub INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    text_pub TEXT,
    img_pub VARCHAR(255),
    date_pub VARCHAR(255),
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;