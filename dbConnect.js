const dotenv = require('dotenv')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  // Your port, if not 3306
  port: 3306,
  // Your username
  user: 'root',
  // Be sure to update with your own MySQL password!
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});

module.exports = {
  connection = connection
};
