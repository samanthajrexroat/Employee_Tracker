const connection = require("../config/connection");

class DB {
    constructor(connection){
        this.connection = connection
    };

    findAllEmployees () {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    };

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
      }


    findAllRoles() {
        return this.connection.promise().query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
      };

    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?;", department);
    }

    updateEmployeeRole(employeeId, roleId) {
      return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
      );
    }

    createRole(role) {
      return this.connection.promise().query("INSERT INTO role SET ?;", role);
  }

  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  };

};

module.exports = new DB (connection)