const express = require("express");
const cors = require("cors");
const mysqlConnection = require("./connection");
const bodyParser = require("body-parser");

app = express();

app.use(bodyParser.json());

mysqlConnection.query(
  "SELECT firstName FROM user WHERE id<=27",
  (err, rows, fields) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  }
);

module.exports = app;
