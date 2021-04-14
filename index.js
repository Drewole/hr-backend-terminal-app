const Inquirer = require('inquirer');
const dbConnect = require('./dbConnect');
const cTable = require('console.table');
const mysql = require('mysql');
const chalk = require('chalk');
const Employee = require("./components/Employee");
const Role = require("./components/Role");
const Department = require("./components/Department");

// Global Variables
let employee = new Employee(dbConnect);
let role = new Role(dbConnect);
let department = new Department(dbConnect);

// The command-line application should allow users to:
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

let init = () => {
    let question = "What can I do for you boss?";
    let options = [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Remove Department",
        "Remove Role",
        "Remove Employee",
        "Exit"
    ];
    Inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: question,
            choices: options
        }
    ).then((data) => {
        switch (data.action) {
            case "View All Departments":
                department.printDepartments();
                init();
                break;
            case "View All Roles":
                role.printRoles();
                init();
                break;
            case "View All Employees":
                employee.printEmployees();
                init();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Exit":
                console.log("Thanks Boss for using our HR Employee Tracker. Have a great day.");
                break;
            default:
                console.log(`Action (${data.action}) is not supported.`);
                init();
                break;
        }
    });
}

// This function will handle adding a role
function addDepartment() {
    let question = "Name of Department to add."
    Inquirer.prompt(
        {
            name: "department",
            type: "input",
            message: question
        }
    ).then((data) => {
        department.insertDepartment(data.department);
        init();
    });
}

// This function will handle adding a role
function addRole() {
    let departments = ["No Departments"];
    // First get the list of departments    
    DB.query("SELECT * FROM departments",
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++) {
                if (res[i].name) {
                    departments.push(res[i].name);
                }
            }

            // Get the role details
            let questions = [
                "Role Name",
                "Role Salary",
                "What department?"];
            Inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: questions[0]
                },
                {
                    name: "salary",
                    type: "number",
                    message: questions[1]
                },
                {
                    name: "department",
                    type: "list",
                    message: questions[2],
                    choices: departments
                }
            ]).then((data) => {
                // get the department to tie to 
                let departmentId = null;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].name === data.department) {
                        departmentId = res[i].id;
                    }
                }
                role.insertRole(data.title, data.salary, departmentId);
                init();
            });

        }
    );
}

dbConnect.connection.connect(function (err) {
    if (err) throw err;

    init();
});