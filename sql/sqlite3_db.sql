# root@supermath:~# sqlite3 sm
# $sqlite3 sm.db < sqlite3_db.sql
CREATE TABLE `users` (
    id BIGINT PRIMARY KEY AUTOINCREMENT,
    name CHARACTER(20) UNIQUE,
    surbname VARCHAR(255),
    email VARCHAR(255),
    pswd CHARACTER(20),
    hash varchar(32) NOT NULL,
    group INT,
    creation DATETIME,
    task CHARACTER(20),
    belt CHARACTER(20),
    pass BIGINT DEFAULT 0,
    fail BIGINT DEFAULT 0,
    avatar CHARACTER(255),
);
