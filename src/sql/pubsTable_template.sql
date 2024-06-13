CREATE TABLE pubs (
    id_pub INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255) NOT NULL,
    msg_pub TEXT,
    img_pub VARCHAR(255),
    date_pub VARCHAR(255)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;