DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    generalXp INT DEFAULT 0 NOT NULL,
    subjectXpMaths INT DEFAULT 0 NOT NULL,
    subjectXpEnglish INT DEFAULT 0 NOT NULL,
    subjectXpScience INT DEFAULT 0 NOT NULL,
    Role VARCHAR(30) DEFAULT 'Student',
    favColor VARCHAR(30) DEFAULT 'Red',
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
    item_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT DEFAULT 1 NOT NULL,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    dueDate DATE NOT NULL,
    subject VARCHAR (100) NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    repeatable BOOLEAN DEFAULT FALSE NOT NULL,
    generalXp INT NOT NULL,
    subjectXp INT NOT NULL,
    PRIMARY KEY (item_id)
    /*FOREIGN KEY (user_id) REFERENCES user_account(user_id)*/
);

INSERT INTO post (title, content, dueDate, subject, generalXp, subjectXp)
VALUES
    ('Complete Math homework assignments.', 'Complete Mr Abduls Homework', '2023-10-09', 'Maths', 3, 19),
    ('Study for upcoming Maths exam.', 'Read through the book and create notes', '2023-04-19', 'Maths', 10, 15),
    ('Work on the English literature essay.', 'Read 10 pages Of Mice and Men', '2023-12-25', 'English', 2, 19),
    ('Complete Maths Homework.', 'Complete exercises 1 to 15 in the Algebra textbook.', '2023-05-25', 'Maths', 2, 19),
    ('Prepare for Maths Exam.', 'Review trigonometry concepts covered in class.', '2023-02-12', 'Maths', 2, 19),
    ('Revise for English Quiz.', 'Review grammar rules for the upcoming quiz.', '2023-02-03', 'English', 2, 19),
    ('Study for Science Exam.', 'Study the periodic table for the Chemistry test.','2023-11-21', 'Science', 2, 19),
    ('Go over Science notes', 'Conduct research for the upcoming Biology project.', '2023-07-01', 'Science', 2, 19);


INSERT INTO user_account (username, password, generalXp, subjectXpMaths,subjectXpEnglish,subjectXpScience,Role)
VALUES ('Ollie', 'Password1', 10, 20,12,34,'Student'), 
       ('Abdul', 'Password2', 20, 10,25,21,'Student'),
       ('Teacher', 'Password3', 20, 10,25,21,'Teacher');

