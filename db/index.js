const connection = require("./connection");

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
//* find all employees


//* add a new department



//* add a new role



//* add a new employee




//* update employee role



}