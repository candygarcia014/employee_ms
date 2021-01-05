use employees_db;

insert into department(name) values ("software"), ("HR"), ("admin");

insert into role(
    title, salary, department_id 
    ) values ("engineer", 90000.00, 1), ("developer", 100000.00, 2), ("junior", 60000.00, 3);
 
insert into employee(
first_name, last_name, role_id, manager_id
) values ("Sam", "Alen",1, NULL), ("Camie", "Master",2, 1), ("John", "Johnson",3, NULL);




