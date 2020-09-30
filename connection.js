const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
<<<<<<< HEAD
  host: "localhost",
  user: "root",
  password: "b@bin6139@",
  database: "bb2",
=======
  // host: "localhost",
  // user: "root",
  // password: "root",
  // database: "bb2",
  // port: "3306",
  host: "sql12.freemysqlhosting.net",
  user: "sql12367859",
  password: "btxdmIHSkp",
  database: "sql12367859",
>>>>>>> aa7d66d2cce7ebc875f3ee8300ebc3be625b3a91
  port: "3306",
  // host: "sql12.freemysqlhosting.net",
  // user: "sql12367859",
  // password: "btxdmIHSkp",
  // database: "sql12367859",
  // port: "3306",
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
