//Connect to database
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: ''
    },
    console.log(`Connected to the classlist_db database.`)
  );

  module.exports = db