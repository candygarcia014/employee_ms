//All requires
var mysql = require("mysql");
var inquirer = require("inquirer");

//Set up connection
var connection = mysql.createConnection({
    host: "localhost",

    // port 
    port: 3306,

    // username
    user: "root",

    // password
    password: "password",
    database: "employees_DB"
});

//Prompt question 1
connection.connect(function(err) {
    if (err) throw err;
    askFirstQuestion();
});

//First Question: Select action
function askFirstQuestion() {
    inquirer
        .prompt([{
            name: "firstQuestion",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Role",
                "exit"
            ]
        }, {
            name: "departmentName",
            type: "input",
            message: "What is the name of the department you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Department")
            }
        }, {
            name: "roleTitle",
            type: "input",
            message: "What is the title of the role you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Role")
            }
        }, {
            name: "roleSalary",
            type: "input",
            message: "What is the salary of the role you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Role")
            }
        }, {
            name: "roleDepartmentID",
            type: "input",
            message: "What is the department ID of the role you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Role")
            }
        }, {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Employee")
            }
        }, {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Employee")
            }
        }, {
            name: "employeeRoleID",
            type: "input",
            message: "What is the role ID of the employee you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Employee")
            }
        }, {
            name: "employeeManagerID",
            type: "input",
            message: "What is the manager ID of the employee you'd like to add?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Add Employee")
            }
        }, {
            name: "updateEmployeeID",
            type: "input",
            message: "What is the employee ID of the employee you'd like to update?",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Update Employee Role")
            }
        }, {
            name: "updateEmployeeRole",
            type: "input",
            message: "What is the new role ID of the employee",
            when: function(answer) {
                return !!answer.firstQuestion && (answer.firstQuestion === "Update Employee Role")
            }
        }])
        .then(function(answer) {
            switch (answer.firstQuestion) {
                case "Add Department":
                    addOptions("department", answer);
                    break;
                case "Add Role":
                    addOptions("role", answer);
                    break;
                case "Add Employee":
                    addOptions("employee", answer);
                    break;
                case "View Departments":
                    viewOptions("department", answer);
                    break;
                case "View Roles":
                    viewOptions("role", answer);
                    break;
                case "View Employees":
                    viewOptions("employee", answer);
                    break;
                case "Update Employee Role":
                    updateEmployeeRole(answer);
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
}

//Function- view a department, role, & employee
function viewOptions(viewAnswer) {
    let viewType = "";
    if (viewAnswer === "role") {
        viewType = `SELECT role.id, role.title, role.salary, department.name AS department, role.department_id AS department_id FROM ${viewAnswer} LEFT JOIN department ON ${viewAnswer}.department_id = department.id`;
    } else if (viewAnswer === "employee") {
        viewType = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM ${viewAnswer} LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    } else {
        viewType = 'SELECT * FROM department'
    }
    connection.query(viewType, function(err, res) {
        if (err) throw err;
        console.table(res)
        askFirstQuestion();
    });
}