DROP DATABASE IF EXISTS alliance_DB;

CREATE DATABASE alliance_DB;

USE alliance_DB;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES roles(id),
  FOREIGN KEY(manager_id) REFERENCES employee(id)
);

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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tanner", "Kirkpatrick", 1, null)

INSERT INTO roles (title, salary, department_id)
VALUES ("Tech Lead", "150,000", 1)

INSERT INTO departments (dept_name)
VALUES ("Development"), ("Sales"), ("Marketing")