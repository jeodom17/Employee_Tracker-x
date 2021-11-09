const colors = require('colors');
const { prompt } = require("inquirer");
const { inherits } = require('util');
const db = require("./db");
const chalk = require('chalk');
const logo = require("asciiart-logo");
require("console.table");


init();

//* Display logo Text, initialize first question
function init() {
    const logoText = logo({ 
        name: "Employee Manager",
        textColor: 'blue',
        logoColor: 'bold-green',
        borderColor: 'blue',
        font: 'Georgia11',
    })
    .render();
  
    console.log(logoText);
 
    handleInitialQuestion();

} 

//* function for ^ handleInitialQuestion -- prompt


function handleInitialQuestion() {
    prompt([
        {
            type: "list",
            name: "userOptions",
            message: "Please choose from the following options to get started.",
            choices: [
              {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS"
              },
              {
                name: "View All Roles",
                value: "VIEW_ROLES"
              },
              {
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
              },
              {
                name: "Add a Department",
                value: "ADD_DEPARTMENT"
              },
              {
                name: "Add a Role",
                value: "ADD_ROLE"
              },
              {
                name: "Add an Employee",
                value: "ADD_EMPLOYEE"
              },
              {
                name: "Update an Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"
              },
            ]
        }

//* function called per user choice -- use switch case for each user answer option --> case "choices value (in name value pair)": --> call function(); --> break; --> next user option

    ]).then(res => {
      let userChoice = res.userChoice;
      switch (userChoice) {
        case "VIEW_DEPARTMENTS":
          handleViewDepartments();
          break;
        case "VIEW_ROLES":
          handleViewRoles();
          break;
        case "VIEW_EMPLOYEES":
          handleViewEmployees();
          break;
        case "ADD_DEPARTMENT":
          handleAddDepartment();
          break;
        case "ADD_ROLE":
          handleAddRole();
          break; 
        case "ADD_EMPLOYEE":
          handleAddEmployee();
          break; 
        case "UPDATE_EMPLOYEE_ROLE":
          handleUpdateEmployeeRole();
          break;  
      }
    }
    )
  };

//*---------------------------------------------------
  //^ Functions for all user choice options
//*---------------------------------------------------

function handleViewDepartments() {


}

function handleViewRoles() {


}

function handleViewEmployees() {


}

function handleAddDepartment() {


}

function handleAddRole() {


}

function handleAddEmployee() {


}

function handleUpdateEmployeeRole() {


}
