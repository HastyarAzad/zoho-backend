const mysql2 = require("mysql2");

// Updated credentials
var mysqlHost = process.env.DB_HOST || "127.0.0.1";
var mysqlPort = process.env.DB_PORT || "3306";
var mysqlUser = process.env.DB_USER || "root";
var mysqlPass = process.env.DB_PASSWORD || "Rozhagamer1";
var mysqlDB = process.env.DB_NAME || "job_application_system";

// creating a config variable
const connectionOptions = {
  host: mysqlHost,
  port: mysqlPort,
  user: mysqlUser,
  password: mysqlPass,
  database: mysqlDB,
};

var db = mysql2.createPool(connectionOptions);

module.exports = db;
