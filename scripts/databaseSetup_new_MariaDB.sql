/*
 roles table set up
*/
CREATE OR REPLACE TABLE roles
(
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(15) NOT NULL
);

INSERT INTO roles (role_name)
VALUES ('GUEST'),
       ('FARMER'),
       ('ADMIN');

/*
  users table set up
 */
CREATE OR REPLACE TABLE users
(
    user_id  INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30)  NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    enabled BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NOT NULL,
    FOREIGN KEY (role) REFERENCES Roles(role_id)
);

INSERT INTO users (username, password, role)
VALUES ('admin', '$2a$12$ZKd5IF0SEBAWeGPnCg2Ozu9AJC4wlJQ22UQdwb8BDQnLN/bwvEZbq', 3),
       ('guest', '$2a$12$SFGyIRjLDB1BH2.jvEijj.HAtt99kYMoVjPxHqjMxNA.b1WoVdPzy', 1);

/*
  livestock table set up
 */
CREATE OR REPLACE TABLE livestock
(
    tag_id                            INT PRIMARY KEY AUTO_INCREMENT,
    animal_type                       ENUM ('CHICKEN', 'SHEEP', 'COW', 'PIG'),
    age                               INT,
    diet                              ENUM ('CANOLA','WHEAT','CORN','POTATOES','MUSTARD','COCONUT'),
    weight                            REAL,
    last_fed                          DATETIME,
    harvestable                       BOOLEAN,
    last_violated_for_harvested_goods DATETIME
);

INSERT INTO livestock (animal_type, age, diet, weight, last_fed, harvestable, last_violated_for_harvested_goods)
VALUES ('CHICKEN', 1, 'WHEAT',0.5, '2023-07-08 00:00:00', FALSE, NULL),
       ('SHEEP', 2, 'WHEAT',30.2, '2023-07-07 00:00:00', TRUE, '2023-07-06 00:00:00'),
       ('COW', 3, 'CORN',500.8, '2023-07-09 00:00:00', FALSE, NULL),
       ('PIG', 2, 'POTATOES', 150.3, '2023-07-08 00:00:00', TRUE, '2023-07-07 00:00:00'),
       ('CHICKEN', 1, 'WHEAT', 0.7, '2023-07-10 00:00:00', FALSE, NULL),
       ('SHEEP', 3, 'CANOLA', 35.8, '2023-07-09 00:00:00', TRUE, '2023-07-08 00:00:00'),
       ('COW', 4, 'MUSTARD', 550.2, '2023-07-11 00:00:00', FALSE, NULL),
       ('PIG', 3, 'COCONUT', 160.6, '2023-07-10 00:00:00', TRUE, '2023-07-09 00:00:00');


/*
  pen table set up
 */
CREATE OR REPLACE TABLE pen
(
    facility_id     INT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(30),
    age             INT,
    max_capacity    INT NOT NULL,
    upkeep          INT,
    type_of_animals ENUM ('CHICKEN', 'SHEEP', 'COW', 'PIG')
);

/*
  housing table set up
 */
CREATE OR REPLACE TABLE housing
(
    facility_id        INT PRIMARY KEY AUTO_INCREMENT,
    name               VARCHAR(30),
    age                INT,
    max_capacity       INT NOT NULL,
    upkeep             INT,
    rent               INT,
    distance_to_fields INT,
    distance_from_pens INT
);

/*
  farmers table set up
 */
CREATE TABLE farmers_1
(
    years_of_employment INT PRIMARY KEY,
    salary              INT
);

CREATE TABLE farmers_2
(
    farmer_id           INT PRIMARY KEY AUTO_INCREMENT,
    full_name           VARCHAR(50) NOT NULL,
    years_of_employment INT,
    FOREIGN KEY (years_of_employment) REFERENCES farmers_1 (years_of_employment)
);

/*
  veterinary records table set up
 */
CREATE OR REPLACE TABLE veterinary_records_has
(
    tag_id        INT NOT NULL,
    record_id     INT AUTO_INCREMENT,
    record_date   DATE,
    health_status VARCHAR(30),
    PRIMARY KEY (tag_id, record_id),
    FOREIGN KEY (tag_id) REFERENCES livestock (tag_id) ON DELETE CASCADE
);


/*
  crop table set up
 */
CREATE OR REPLACE TABLE crops
(
    crop_type ENUM ('CANOLA', 'WHEAT', 'CORN', 'POTATOES', 'MUSTARD', 'COCONUT'),
    crop_variant ENUM ('POLLINATED', 'HYBRIDS'),
    crop_status ENUM ('PLANTED', 'HARVESTED'),
    quantity  INT,
    PRIMARY KEY (crop_type, crop_variant, crop_status)
);

INSERT INTO crops (crop_type, crop_variant, crop_status, quantity)
VALUES ('CANOLA', 'POLLINATED', 'PLANTED', 100),
       ('CANOLA', 'POLLINATED', 'HARVESTED', 50),
       ('CANOLA', 'HYBRIDS', 'PLANTED', 200),
       ('CANOLA', 'HYBRIDS', 'HARVESTED', 100),
       ('WHEAT', 'POLLINATED', 'PLANTED', 150),
       ('WHEAT', 'POLLINATED', 'HARVESTED', 75),
       ('WHEAT', 'HYBRIDS', 'PLANTED', 250),
       ('WHEAT', 'HYBRIDS', 'HARVESTED', 125),
       ('CORN', 'POLLINATED', 'PLANTED', 120),
       ('CORN', 'POLLINATED', 'HARVESTED', 60),
       ('CORN', 'HYBRIDS', 'PLANTED', 180),
       ('CORN', 'HYBRIDS', 'HARVESTED', 90),
       ('POTATOES', 'POLLINATED', 'PLANTED', 80),
       ('POTATOES', 'POLLINATED', 'HARVESTED', 40),
       ('POTATOES', 'HYBRIDS', 'PLANTED', 160),
       ('POTATOES', 'HYBRIDS', 'HARVESTED', 80),
       ('MUSTARD', 'POLLINATED', 'PLANTED', 70),
       ('MUSTARD', 'POLLINATED', 'HARVESTED', 35),
       ('MUSTARD', 'HYBRIDS', 'PLANTED', 140),
       ('MUSTARD', 'HYBRIDS', 'HARVESTED', 70),
       ('COCONUT', 'POLLINATED', 'PLANTED', 90),
       ('COCONUT', 'POLLINATED', 'HARVESTED', 45),
       ('COCONUT', 'HYBRIDS', 'PLANTED', 180),
       ('COCONUT', 'HYBRIDS', 'HARVESTED', 90);
