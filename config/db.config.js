const mysql2 = require("mysql2");

// var mysqlHost = process.env.MYSQL_HOST;
// var mysqlPort = process.env.MYSQL_PORT;
// var mysqlUser = process.env.MYSQL_USER;
// var mysqlPass = process.env.MYSQL_PASS;
// var mysqlDB = process.env.MYSQL_DB;

var mysqlHost = process.env.MYSQL_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_PORT || '3306';
var mysqlUser = process.env.MYSQL_USER || 'root';
var mysqlPass = process.env.MYSQL_PASS || '';
var mysqlDB = process.env.MYSQL_DB || 'kashakeel';

// creating a config variable
const connectionOptions = {
  host: mysqlHost,
  port: mysqlPort,
  user: mysqlUser,
  password: mysqlPass,
  database: mysqlDB
};

var db = mysql2.createPool(connectionOptions);

module.exports = db;