// Inquirer prompts
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./config/connection");

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
    .then((answer) => {
        switch (answes.action) {
            case "View All Employees":
                findAllEmployees();
                break;
        }
    })

};
