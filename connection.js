const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
<<<<<<< HEAD
  // host: "localhost",
  // user: "root",
  // password: "b@bin6139@",
  // database: "bb2",
  // port: "3306",
  host: "sql12.freemysqlhosting.net",
  user: "sql12367859",
  password: "btxdmIHSkp",
  database: "sql12367859",
  port: "3306",
=======
  host: "localhost",
  user: "root",
  password: "b@bin6139@",
  database: "bb2",
  port: "3306",
  // host: "sql12.freemysqlhosting.net",
  // user: "sql12367859",
  // password: "btxdmIHSkp",
  // database: "sql12367859",
  // port: "3306",
  // host: "sql12.freemysqlhosting.net",
  // user: "sql12367859",
  // password: "btxdmIHSkp",
  // database: "sql12367859",
  // port: "3306",
>>>>>>> 1fdab7b8c6a2484e5f3e553f785e08c3aa5a8151
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connection success");
  }
});

module.exports = mysqlConnection;
