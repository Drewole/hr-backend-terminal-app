DROP DATABASE IF EXISTS hr_employees;
CREATE database hr_employees;
USE hr_employees;

CREATE TABLE departments(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER(4),
  role_id INTEGER(4),
  FOREIGN KEY(department_id) REFERENCES departments(id),
  PRIMARY KEY (id)
);
CREATE TABLE employees(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  role_id INT(6),
  manager_id INTEGER(4),
  FOREIGN KEY(role_id) REFERENCES roles(id),
  FOREIGN KEY(manager_id) REFERENCES employees(id),
  PRIMARY KEY (id)
);

INSERT INTO departments (name) values 
('Accounting'),
('Sales'),
('Engineering'),
('Design'),
('Legal'),
('Finance');

INSERT INTO roles (title,salary) values 
('Sales Lead', 85000),
('Salesperson', 65000),
('Lead Engineer', 124000),
('Engineer', 105000),
('Designer', 75000),
('Legal Lead', 145000),
('Lawyer', 110000),
('Accountant', 95000);

INSERT INTO employees (firstName,lastName) values 
('Scarlet','Jones'),
('Stefanie','Williamson'),
('Joe','Sugar'),
('Bennet', 'Johnson'),
('Felicia', 'Roberts'),
('Jimmie', 'John'),
('Taylor', 'Swift'),
('Bob', 'Lawrence'),
('Casey', 'Neistat');
