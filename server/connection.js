const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "b@bin6139@",
  database: "bb2",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("DB connection success");
  }
});

module.exports = mysqlConnection;
