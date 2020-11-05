DROP DATABASE IF EXISTS alliance_DB;

CREATE DATABASE alliance_DB;

USE alliance_DB;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);


CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES roles(id),
  FOREIGN KEY(manager_id) REFERENCES employees(id)
);




INSERT INTO departments (dept_name)
VALUES ("Development"), ("Sales"), ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Tech Lead", 150000, 1),
("Full Stack Developer", 800000, 1), 
("Front End Developer", 75000, 1),
("UX/UI Designer", 600000, 1),

("Director of Sales", 115000, 2),
("Area Manager", 90000, 2),
("Account Manager", 65000, 2),
("Inside Sales", 50000, 2),

("Director of Marketing", 120000, 3),
("Account Strategist", 90000, 3),
("SEO Analyst", 75000, 3),
("SEM Analyst", 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Graham", "Ball", 1, null),
("Tom", "Raymond", 2, 1),
("Pete", "Thomas", 3, 1),
("Alice", "Chen", 4, 1),

("James", "Godfrey", 5, null),
("Dan", "Parker", 6, 5),
("Hector", "Raymond", 7, 5),
("Matt", "Willis", 8, 5),

("Tony", "Bishop", 9, null),
("Polly", "Gump", 10, 9),
("Virginia", "Wilson", 11, 9),
("Chad", "Connor", 12, 9);










