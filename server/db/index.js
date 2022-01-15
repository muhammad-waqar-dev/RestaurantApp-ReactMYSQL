const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.REACT_APP_HOST_NAME,
  user: process.env.REACT_APP_DB_USER_NAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DATABASE_NAME,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

module.exports = pool.promise();
