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
      choices: ["View All Employees", "Add Employee", "Remove Employee", "Exit"],
    })
    .then(function (answer) {
      if (answer.actionList === "View All Employees") {
        viewList();
      } else if (answer.actionList === "Add Employee") {
        addEmployee();
      } else if (answer.actionList === "Remove Employee") {
        removeEmployee();
      } else if (answer.actionList === "Exit") {
        connection.end();
      } 
    });
}

function viewList() {
  inquirer.prompt([]);
}

function addEmployee() {
  inquirer
    .prompt({
      name: "addAction",
      type: "list",
      message: "Input Information:",
      choices: [
        "Employee Information",
        "Employee Role",
        "Department Information",
        "Return Home"
      ],
    })
    .then(function (answer) {
      if (answer.addAction === "Employee Information") {
        employeeInfo();
      } else if (answer.addAction === "Employee Role") {
        employeeRole();
      } else if (answer.addAction === "Department Information") {
        deptInfo();
      } else if (answer.addAction === "Return Home") {
        start();
      }
      
    });
}

function employeeInfo() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Input Employee First Name: ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Input Employee Last Name: ",
      },
      {
        name: "roleID",
        type: "input",
        message: "Input Role ID: ",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee Information Added!");

          addEmployee();
        }
      );
    });
}

function employeeRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Input Employee Role Title: ",
      },
      {
        name: "newSalary",
        type: "input",
        message: "Input Employee Salary: ",
      },
      {
        name: "deptID",
        type: "input",
        message: "Input Employee Department ID: ",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee_role SET ?",
        {
          role_title: answer.newRole,
          salary: answer.newSalary,
          dept_id: answer.deptID,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee Role Added!");

          addEmployee();
        }
      );
    });
}

function deptInfo() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Input Employee Department: ",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.newDepartment,
        },
        function (err) {
          if (err) throw err;
          console.log("Department Added!");

          addEmployee();
        }
      );
    });
}

function removeEmployee() {
  inquirer.prompt([]);
}
