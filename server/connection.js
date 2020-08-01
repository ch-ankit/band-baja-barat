const mysql = require("mysql");
const express = require("express");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@bandbajabharat#",
  database: "bbb",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});

module.exports = mysqlConnection;
