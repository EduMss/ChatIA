CREATE DATABASE Login;

USE Login; 

CREATE TABLE Users (
    Id uniqueidentifier DEFAULT NEWID() PRIMARY KEY,
    UserName NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(100) NOT NULL
);


DROP TABLE Users;

INSERT INTO Users (UserName, Password) VALUES ('Eduardo', 'senhaSeguraHashed');

SELECT * FROM Users;

TRUNCATE TABLE Users;