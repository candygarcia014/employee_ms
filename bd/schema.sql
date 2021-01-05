drop database if exists employees_db;
create database employees_db;
use employees_db;

create table department (
    id int primary key AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
); 


create table role (
    id int primary key AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary decimal NOT NULL, 
    department_id INT NOT NULL

); 


create table employee (
    id int primary key AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

-- ID's are not null (excpt manager_id) 
-- all _Id's need confuguing as foreign keys 