DROP TABLE IF EXISTS Token;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS User_Account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    generalXp INT NOT NULL,
    subjectXpMaths INT NOT NULL,
    subjectXpEnglish INT NOT NULL,
    subjectXpScience INT NOT NULL,
    Role VARCHAR(30) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE post (
    Item_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT DEFAULT 1 NOT NULL,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    dueDate DATE NOT NULL,
    subject VARCHAR (100) NOT NULL,
    completed boolean DEFAULT FALSE NOT NULL,
    repeatable boolean DEFAULT FALSE NOT NULL,
    generalXp INT NOT NULL,
    subjectXp INT NOT NULL,
    PRIMARY KEY (Item_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);
