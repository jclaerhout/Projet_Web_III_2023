CREATE TABLE IF NOT EXISTS Categories (
id INT NOT NULL auto_increment,
name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(500),
PRIMARY KEY (id)
);

INSERT INTO Categories (name, description) VALUES ("Paysage", "photo de l'environement"),
("Portrait", "Un portrait photographique est un portrait visuel d'une personne"),
("Animaux", "photo d'animaux"),
("Nourriture", "photo de nourriture"),
("Sport", "photo de sport"),
("Ville", "photo de ville"),
("Nature", "photo de nature"),
("Famille", "photo de famille"),
("Amis", "photo d'amis"),
("Fête", "photo de fête"),
("Mariage", "photo de mariage"),
("Naissance", "photo de naissance"),
("Autre", "photo d'autre");

CREATE TABLE IF NOT EXISTS Users (
id INT NOT NULL auto_increment,
name VARCHAR(50) NOT NULL,
firstname VARCHAR(50) NOT NULL,
birthdate DATE NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
sexe VARCHAR(50) NOT NULL,
location VARCHAR(50) NOT NULL,
favoriteEquipment VARCHAR(255) NOT NULL,
xpPro VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO Users (name, firstname, birthdate, email, password, sexe, location, favoriteEquipment, xpPro)
VALUES ("Doe", "John", "1968-01-01", "johndoe@gmail.com", "123456", "homme", "Paris", "Sony A7III", "Etudiant"),
("Doe", "Jane", "1968-01-01", "janedoe@gmail.com", "123456", "homme", "Paris", "Sony A7III", "Etudiant"),
("Doe", "Jack", "1968-01-01", "jackdoe@gmail.com", "123456", "homme", "Paris", "Sony A7III", "Etudiant"),
("Doe", "Jill", "1968-01-01", "jilldoe@gmail.com", "123456", "homme", "Paris", "Sony A7III", "Etudiant");

CREATE TABLE IF NOT EXISTS Roles (
id INT NOT NULL auto_increment,
name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(500),
PRIMARY KEY (id)
);

INSERT INTO Roles (name, description) VALUES ("Admin", "Administrateur"), ("User", "Utilisateur"), ("Guest", "Invité");

CREATE TABLE IF NOT EXISTS Pictures (
id INT NOT NULL auto_increment,
id_user INT NOT NULL,
link VARCHAR(255) NOT NULL UNIQUE,
description VARCHAR(500),
PRIMARY KEY (id),
FOREIGN KEY (id_user) REFERENCES Users(id)
);

INSERT INTO Pictures (id_user, link, description) VALUES (1, "link1", "description"),
(2, "link2", "description"),
(3, "link3", "description"),
(4, "link4", "description");

CREATE TABLE IF NOT EXISTS Relations (
id_follower INT,
id_followed INT,
PRIMARY KEY (id_follower, id_followed),
FOREIGN KEY (id_follower) REFERENCES Users(id),
FOREIGN KEY (id_followed) REFERENCES Users(id)
);

INSERT INTO Relations (id_follower, id_followed) VALUES (1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 4),
(4, 1),
(4, 2),
(4, 3);

CREATE TABLE IF NOT EXISTS Comments (
id INT NOT NULL auto_increment,
id_user INT NOT NULL,
id_picture INT NOT NULL,
DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (id_user) REFERENCES Users(id),
FOREIGN KEY (id_picture) REFERENCES Pictures(id)
);

INSERT INTO Comments (id_user, id_picture, DATE) VALUES (1, 1, "2019-01-01 00:00:00"),
(2, 1, "2019-01-01 00:00:00"),
(3, 1, "2019-01-01 00:00:00"),
(4, 1, "2019-01-01 00:00:00"),
(1, 2, "2019-01-01 00:00:00"),
(2, 2, "2019-01-01 00:00:00"),
(3, 2, "2019-01-01 00:00:00"),
(4, 2, "2019-01-01 00:00:00"),
(1, 3, "2019-01-01 00:00:00"),
(2, 3, "2019-01-01 00:00:00"),
(3, 3, "2019-01-01 00:00:00"),
(4, 3, "2019-01-01 00:00:00"),
(1, 4, "2019-01-01 00:00:00"),
(2, 4, "2019-01-01 00:00:00"),
(3, 4, "2019-01-01 00:00:00"),
(4, 4, "2019-01-01 00:00:00");

CREATE TABLE IF NOT EXISTS Likes (
id_user INT NOT NULL,
id_picture INT NOT NULL,
PRIMARY KEY (id_user, id_picture),
FOREIGN KEY (id_user) REFERENCES Users(id),
FOREIGN KEY (id_picture) REFERENCES Pictures(id)
);

INSERT INTO Likes (id_user, id_picture) VALUES (1, 1),
(2, 1),
(3, 1),
(4, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(1, 4),
(2, 4),
(3, 4),
(4, 4);

CREATE TABLE IF NOT EXISTS Users_Roles (
id_user INT NOT NULL,
id_role INT NOT NULL,
PRIMARY KEY (id_user, id_role),
FOREIGN KEY (id_user) REFERENCES Users(id),
FOREIGN KEY (id_role) REFERENCES Roles(id)
);

INSERT INTO Users_Roles (id_user, id_role) VALUES (1, 1),
(2, 2),
(3, 2),
(4, 2);

CREATE TABLE IF NOT EXISTS Categories_Pictures (
id_categorie INT NOT NULL,
id_picture INT NOT NULL,
PRIMARY KEY (id_categorie, id_picture),
FOREIGN KEY (id_categorie) REFERENCES Categories(id),
FOREIGN KEY (id_picture) REFERENCES Pictures(id)
);

INSERT INTO Categories_Pictures (id_categorie, id_picture) VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4);