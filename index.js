// Inquirer prompts
const inquirer = require("inquirer");

const menu = [
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
];