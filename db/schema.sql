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

USE alliance_DB;
SELECT
roles.title AS Title,
roles.salary AS Salary,
departments.dept_name AS Department


FROM roles 
INNER JOIN departments ON roles.department_id = departments.id










