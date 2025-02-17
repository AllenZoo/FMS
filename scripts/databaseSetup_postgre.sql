/*
 roles table set up
*/
CREATE TABLE IF NOT EXISTS roles
(
    role_id   SERIAL PRIMARY KEY,
    role_name VARCHAR(15) NOT NULL
);

INSERT INTO roles (role_name)
VALUES ('GUEST'),
       ('FARMER'),
       ('ADMIN');

/*
  users table set up
 */
CREATE TABLE IF NOT EXISTS users
(
    user_id    SERIAL4 PRIMARY KEY,
    username   VARCHAR(30)  NOT NULL,
    password   VARCHAR(100) NOT NULL,
    first_name VARCHAR(30),
    last_name  VARCHAR(30),
    role       INT          NOT NULL,
    active     BOOLEAN DEFAULT TRUE,
    enabled    BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ     NOT NULL,
    FOREIGN KEY (role) REFERENCES roles (role_id)
);

INSERT INTO users (username, password, role, last_login)
VALUES ('admin', '$2a$12$ZKd5IF0SEBAWeGPnCg2Ozu9AJC4wlJQ22UQdwb8BDQnLN/bwvEZbq', 3, now()),
       ('guest', '$2a$12$SFGyIRjLDB1BH2.jvEijj.HAtt99kYMoVjPxHqjMxNA.b1WoVdPzy', 1, now());

/*
  livestock table set up
 */
CREATE TABLE IF NOT EXISTS livestock
(
    tag_id                            SERIAL PRIMARY KEY,
    animal_type                       VARCHAR(10) CHECK (animal_type IN ('CHICKEN', 'SHEEP', 'COW', 'PIG')),
    age                               INT,
    diet                              VARCHAR(10) CHECK (diet IN ('CANOLA', 'WHEAT', 'CORN', 'POTATOES', 'MUSTARD', 'COCONUT')),
    weight                            REAL,
    last_fed                          TIMESTAMP,
    harvestable                       BOOLEAN,
    last_violated_for_harvested_goods TIMESTAMP
);

INSERT INTO livestock (animal_type, age, diet, weight, last_fed, harvestable, last_violated_for_harvested_goods)
VALUES ('CHICKEN', 1, 'WHEAT', 0.5, '2023-07-08 00:00:00', FALSE, NULL),
       ('SHEEP', 2, 'WHEAT', 30.2, '2023-07-07 00:00:00', TRUE, '2023-07-06 00:00:00'),
       ('COW', 3, 'CORN', 500.8, '2023-07-09 00:00:00', FALSE, NULL),
       ('PIG', 2, 'POTATOES', 150.3, '2023-07-08 00:00:00', TRUE, '2023-07-07 00:00:00'),
       ('CHICKEN', 1, 'WHEAT', 0.7, '2023-07-10 00:00:00', FALSE, NULL),
       ('SHEEP', 3, 'CANOLA', 35.8, '2023-07-09 00:00:00', TRUE, '2023-07-08 00:00:00'),
       ('COW', 4, 'MUSTARD', 550.2, '2023-07-11 00:00:00', FALSE, NULL),
       ('PIG', 3, 'COCONUT', 160.6, '2023-07-10 00:00:00', TRUE, '2023-07-09 00:00:00');

/*
  pen table set up
 */
CREATE TABLE IF NOT EXISTS pen
(
    facility_id     SERIAL PRIMARY KEY,
    name            VARCHAR(30),
    age             INT,
    max_capacity    INT NOT NULL,
    upkeep          INT,
    type_of_animals VARCHAR(10) CHECK (type_of_animals IN ('CHICKEN', 'SHEEP', 'COW', 'PIG'))
);

/*
  housing table set up
 */
CREATE TABLE IF NOT EXISTS housing
(
    facility_id        SERIAL PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS farmers_1
(
    years_of_employment INT PRIMARY KEY,
    salary              INT
);

CREATE TABLE IF NOT EXISTS farmers_2
(
    farmer_id           SERIAL PRIMARY KEY,
    full_name           VARCHAR(50) NOT NULL,
    years_of_employment INT,
    FOREIGN KEY (years_of_employment) REFERENCES farmers_1 (years_of_employment)
);

/*
  veterinary records table set up
 */
CREATE TABLE IF NOT EXISTS veterinary_records_has
(
    tag_id        INT NOT NULL,
    record_id     SERIAL PRIMARY KEY,
    record_date   DATE,
    health_status VARCHAR(30),
    FOREIGN KEY (tag_id) REFERENCES livestock (tag_id) ON DELETE CASCADE
);
