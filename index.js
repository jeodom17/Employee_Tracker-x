const colors = require('colors');
const { prompt } = require("inquirer");
const db = require("./db");
const logo = require("asciiart-logo");
const chalk = require('chalk');
require("console.table");

const mysql = require("mysql2");


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
            message: chalk`{redBright Please choose from the following options to get started.}`,
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

// view departments
function handleViewDepartments() {
  db.handleFindDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => handleInitialQuestion());

}

// view all roles
function handleViewRoles() {
  db.handleFindRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => handleInitialQuestion());

}

// view all employees
function handleViewEmployees() {
  db.handleFindEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => handleInitialQuestion());

}

// add new department
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

// add a new role
function handleAddRole() {

  db.handleFindDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
    })

  prompt([
    {
      name: "title",
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

};

// add new employee
function handleAddEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Enter the employee's first name."
    },
    {
      name: "last_name",
      message: "Enter the employee's last name"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.handleFindRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "Select the employee's role.",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;

              db.handleFindEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  managerChoices.unshift({ name: "None", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Select the employee's manager",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.handleNewEmployee(employee);
                    })
                    .then(() => console.log(
                      `${firstName} ${lastName} Added successfully.`
                    ))
                    .then(() => handleInitialQuestion())
                })
            })
          })
        })
};

// update an employee's role
function handleUpdateRole() {
  db.handleFindEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Choose Employee to update.",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.handleFindRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));

              prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Choose a role for the Employee.",
                  choices: roleChoices
                }
              ])
                .then(res => db.handleUpdateRole(employeeId, res.roleId))
                .then(() => console.log("Role Updated."))
                .then(() => handleInitialQuestion())
            });
        });
    })
    
}

//* Exit the application
function quit() {
  console.log("Adios");
  process.exit();
};