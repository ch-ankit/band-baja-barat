const express = require("express");
const path = require("path");
const cors = require("cors");
const mysqlConnection = require("./connection");
const bodyParser = require("body-parser");
const giftRouter = require("./routes/giftstore");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");

app = express();

app.use(bodyParser.json());

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/giftstore", giftRouter);

// mysqlConnection.query(
//   "SELECT * FROM user WHERE id<=27",
//   (err, rows, fields) => {
//     if (!err) {
//       console.log(rows);
//     } else {
//       console.log(err);
//     }
//   }
// );

module.exports = app;
