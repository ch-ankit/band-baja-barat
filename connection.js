const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "root",
  // database: "bb2",
  // port: "3306",
<<<<<<< HEAD
  // host: "sql12.freemysqlhosting.net",
  // user: "sql12367859",
  // password: "btxdmIHSkp",
  // database: "sql12367859",
  // port: "3306",
=======
>>>>>>> 92aab5e715060777d8303a5e545a05e19c90e31e
  host: "sql12.freemysqlhosting.net",
  user: "sql12367859",
  password: "btxdmIHSkp",
  database: "sql12367859",
  port: "3306",
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
