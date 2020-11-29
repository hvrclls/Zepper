var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "actionList",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employee", "Remove Employee"],
    })
    .then(function (answer) {
      if (answer.actionList === "View All Employees") {
        viewList();
      } else if (answer.actionList === "Add Employee") {
        addEmployee();
      } else if (answer.actionList === "Remove Employee") {
        removeEmployee();
      }
    });
}

function viewList() {
  inquirer.prompt([

  ]);
}

function addEmployee() {
  inquirer.prompt([
    {
        name: "firstName",
        type: "input",
        message: "Input Employee First Name: ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Input Employee First Name: ",
      },
      {
        name: "newDepartment",
        type: "input",
        message: "Input Employee Department: ",
      },
      {
        name: "newRole",
        type: "input",
        message: "Input Employee Role: ",
      },
      {
        name: "newSalary",
        type: "input",
        message: "Input Employee Salary: ",
      },
  ]).then(function(answer){
      "INSERT INTO employee SET ?",
      {
          
      }
  })
}

function removeEmployee() {
  inquirer.prompt([]);
}
