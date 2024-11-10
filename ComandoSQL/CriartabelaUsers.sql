CREATE DATABASE Login;

USE Login; 

CREATE TABLE Users (
    Id uniqueidentifier DEFAULT NEWID() PRIMARY KEY,
    UserName NVARCHAR(100) UNIQUE NOT NULL,
    Password VARBINARY(100) NOT NULL
);


SELECT HASHBYTES('MD5', 'NO COLLUSION');

DROP TABLE Users;

INSERT INTO Users (UserName, Password) VALUES ('Eduardo', 'senhaSeguraHashed');

SELECT * FROM Users;

TRUNCATE TABLE Users;
