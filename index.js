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
  db.handleFindDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => handleInitialQuestion());

}

function handleViewRoles() {
  db.handleFindRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => handleInitialQuestion());

}

function handleViewEmployees() {
  db.handleFindEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => handleInitialQuestion());

}

function handleAddDepartment() {
  prompt([
    {
      name: "name",
      message: "Enter the NEW Department Name."
    }
  ])
    .then(res => {
      let name = res;
      db.handleNewDepartment(name)
        .then(() => console.log(`${name.name} Added `))
        .then(() => handleInitialQuestion())
    })

}

function handleAddRole() {

  db.handleFindDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

  prompt([
    {
      name: "name",
      message: "Enter the name of the NEW Role."
    },
    {
      name: "salary",
      message: "Enter the salary of the NEW role."
    },
    {
      type: "list",
      name: "department_id",
      message: "Choose the department that the NEW role belongs to.",
      choices: departmentChoices
    }
  ]).then(res => {
      let name = res;
      db.handleNewRole(name)
        .then(() => console.log(`${name.name} Added `))
        .then(() => handleInitialQuestion())
    })

},

function handleAddEmployee() {


},

function handleUpdateEmployeeRole() {


}