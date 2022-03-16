//Connect to database
const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  module.exports = connection