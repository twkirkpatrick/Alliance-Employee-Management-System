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
    FOREIGN KEY(department_id) REFERENCES departments(id)
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
VALUES ("Marketing"), ("Sales"), ("Development");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Front End Developer", 75000, 3),
("Tech Lead", 150000, 3),
("Director of Marketing", 120000, 1),
("Account Manager", 65000, 2),
("Director of Sales", 115000, 2),
("Full Stack Developer", 80000, 3), 
("SEO Analyst", 75000, 1),
("Account Strategist", 90000, 1),
("Area Manager", 90000, 2),
("UX/UI Designer", 60000, 3),
("Inside Sales", 50000, 2),
("SEM Analyst", 70000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("James", "Godfrey", 5, null),
("Tony", "Bishop", 3, null),
("Graham", "Ball", 2, null),
("Tom", "Raymond", 6, 3),
("Alice", "Chen", 10, 3),
("Chad", "Connor", 12, 2),
("Dan", "Parker", 9, 1),
("Pete", "Thomas", 1, 3),
("Polly", "Gump", 8, 2),
("Virginia", "Wilson", 7, 2),
("Hector", "Raymond", 4, 1),
("Matt", "Willis", 11, 1);


SELECT
e.id,
CONCAT(e.first_name, " ", e.last_name) AS Name,
roles.title AS Title,
roles.salary AS Salary,
departments.dept_name AS Department,
CONCAT(m.first_name, " ", m.last_name) AS Manager

FROM employees e 
INNER JOIN roles ON e.role_id = roles.id
INNER JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees m ON e.manager_id = m.id;










