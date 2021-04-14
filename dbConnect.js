const dotenv = require('dotenv')
const mysql = require('mysql')

require('dotenv').config()
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: 3306,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

module.exports = {
  connection: connection
};
