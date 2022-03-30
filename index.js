// Inquirer prompts
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./config/connection");
const DB = require("./db")

connection.connect((error) => {
    if (error) throw error;
    console.log("Employee Tracker");
    userPrompt();
})

const userPrompt = () =>{ 
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "options",
            choices: 
            [   "View All Employees", 
                "Add Employee", 
                "Update Employee Role", 
                "View All Roles",
                "Add Role", 
                "View All Departments", 
                "Add Department", 
            ],
        }
    ])
    .then((answers) => {
        switch (answers.options) {
            case "View All Employees":
                viewAllEmployees()
                break;
            
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            
            case "View All Roles":
                viewAllRoles()
                break;

            case "Add Role":
                addRole()
                break;

            case "View All Departments":
                viewAllDepartments()
                break;
            
            case "Add Department":
                addDepartment()
                break;
        }
    })
};

function viewAllEmployees() {
    DB.findAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.table(employees)
    })
    .then(() => userPrompt())
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?" 
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ])
    .then(response => {
        let firstName = response.first_name
        let lastName = response.last_name
        DB.findAllRoles()
        .then(([rows]) => {
            let roles = rows
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
            inquirer.prompt({
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roleChoices
            })
            .then((res) => {
                let role = res.role
                DB.findAllEmployees()
                .then(([rows]) => {
                    let employees = rows
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: first_name + " " + last_name,
                        value: id
                    }));
                    inquirer.prompt({   
                        type: "list",
                        name: "manager",
                        message: "Who is the employee's manager?",
                        choices: managerChoices
                    })
                    .then((data) => {
                        let newEmployee = {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: role,
                            manager_id: data.manager
                        }
                        DB.createEmployee(newEmployee)
                    })
                    .then(() => userPrompt());
                })
            })
        })
    }) 
};

function updateEmployeeRole() {
    DB.findAllEmployees()
    .then(([rows]) => {
        let roles = rows
        const employeeChoices = roles.map(({ id, first_name, last_name  }) => ({
            name: first_name + last_name,
            value: id,
        }));
        inquirer.prompt([{
            type: "list",
            name: "employee_id",
            message: "Which employee's role would you like to update?",
            choices: employeeChoices
        }])
        .then((data) => {
            const employeeId = data.employee_id
            DB.findAllRoles()
        .then(([rows]) => {
            let roles = rows
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
            inquirer.prompt({
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roleChoices
            })
            .then((data2) => {
                DB.updateEmployeeRole(employeeId, data2.role)
            })
            .then(() => userPrompt());
        }) 
    })
    })   
}

function viewAllRoles() {
    DB.findAllRoles()
    .then(([rows]) => {
        let roles = rows
        console.table(roles)
    })
    .then(() => userPrompt())
}

function addRole(){
    inquirer.prompt([
        {
            name: "new_role",
            type: "input",
            message: "What is the name of your new Role?"
        },{
            name: "salary",
            type: "number",
            message: "What is the role's salary?"
        }
    ])
    .then((response) => {
        let name = response.new_role
        let salary = response.salary
        DB.findAllDepartments(name)
        .then(([rows]) => {
            let departments = rows
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            inquirer.prompt({
                type: "list",
                name: "departments",
                message: "What department does the role belong to?",
                choices: departmentChoices
            })
            .then((data) => {
                let newRole = {
                    title: name,
                    salary: salary,
                    department_id: data.departments
                }
                DB.createRole(newRole)
            })
            .then(() => userPrompt());
        })
    })
}

function viewAllDepartments(){
    DB.findAllDepartments()
    .then(([rows]) => {
        let departments = rows
        console.table(departments)
    })
    .then(() => userPrompt())
}

function addDepartment(){
    inquirer.prompt([
        {
            name: "new_department",
            type: "input",
            message: "What is the name of your new Department?"
        }
    ])
    .then((response) => {
        let name = response.new_department

        let newDepartment = {
            name: name
        }

        DB.createDepartment(newDepartment)
        .then(([rows]) => {
            let departments = rows
            console.table(departments)
        })
        .then(() => userPrompt())
    })
}