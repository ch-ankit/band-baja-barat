const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bb2",
  port: "3306",
  // host: "sql12.freemysqlhosting.net",
  // user: "sql12365010",
  // password: "ZaMN4KKmPT",
  // database: "sql12365010",
  // port: "3306",
  // multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connection success");
  }
});

module.exports = mysqlConnection;
