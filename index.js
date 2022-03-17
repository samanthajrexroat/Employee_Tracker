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
                "Exit Program"
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
            
            case "View All Roles":
                viewAllRoles()
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
}



function viewAllRoles() {
    DB.findAllRoles()
    .then(([rows]) => {
        let roles = rows
        console.table(roles)
    })
    .then(() => userPrompt())
}