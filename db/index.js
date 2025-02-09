const connection = require("./connection");
const mysql = require("mysql2");


class DB {
    constructor(connection) {
      this.connection = connection;
    }
//* find all departments
    handleFindDepartments() {
        return this.connection.promise().query(
          "SELECT department.id, department.name FROM department;"
        );
      }
//* find all roles
      handleFindRoles() {
        return this.connection.promise().query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
      }
//* find all employees and join with roles and departments
handleFindEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

//* add a new department
handleNewDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }


//* add a new role
handleNewRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }


//* add a new employee
handleNewEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }



//* update employee role
handleUpdateRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

}

module.exports = new DB(connection);
