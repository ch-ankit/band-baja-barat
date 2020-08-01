const express = require('express');
const path = require('path');
const cors = require('cors');
const mysqlConnection = require('./connection');
const bodyParser = require('body-parser');

const loginRouter = require('./routes/login');

app = express();

app.use(bodyParser.json());

app.use('/login', loginRouter);

// mysqlConnection.query(
//   "SELECT firstName FROM user WHERE id<=27",
//   (err, rows, fields) => {
//     if (!err) {
//       console.log(rows);
//     } else {
//       console.log(err);
//     }
//   }
// );

module.exports = app;
