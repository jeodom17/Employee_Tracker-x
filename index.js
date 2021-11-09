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


    ]).then((answers) => {
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
}




//* function called per user choice -- use switch case for each user answer option --> case "choices value (in name value pair)": --> call function(); --> break; --> next user option












//^ Functions for all user choice options














