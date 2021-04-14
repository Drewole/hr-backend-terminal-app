const mysql = require('mysql');
const inquirer = require('inquirer')
const connection = require('./dbConnect')
const chalk = require('chalk')

// Read all products at program start
const readProducts = () => {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    displayProducts(res);
    connection.end();
  });
};

const deleteProduct = () => {
  console.log('Deleting all strawberry icecream...\n');
  connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry',
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products deleted!\n`);
      // Call readProducts AFTER the DELETE completes
      readProducts();
      connection.end();
    }
  );
};

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
                start();
                break;
            case "View All Roles":
                role.printRoles();
                start();
                break;
            case "View All Employees":
                employee.printEmployees();
                start();
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
                start();
                break;
        }
    });
}
    
connection.connect((err) => {
    if (err) throw err;
    init();
})