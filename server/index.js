const express = require("express");
const path = require("path");
const cors = require("cors");
const mysqlConnection = require("./connection");
const bodyParser = require("body-parser");

//IMPORTING ROUTES:-
const bbbRouter = require("./routes/bbb");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const giftRouter = require("./routes/giftstore");
const hostRouter = require("./routes/host");
const bandRouter = require("./routes/band");
const userHomeRouter = require("./routes/userHome");
const invitationRouter = require("./routes/invitation");
const organizerRouter = require("./routes/organizer");
const eventRouter = require("./routes/event");
const guestListRouter = require("./routes/guestList");
const menuRouter = require("./routes/menu");

app = express();
app.use(bodyParser.json());
app.use(cors());

//ROUTING:-
app.use("/bbb", bbbRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/giftstore", giftRouter);
app.use("/host", hostRouter);
app.use("/band", bandRouter);
app.use("/userhome", userHomeRouter);
app.use("/invitation", invitationRouter);
app.use("/organizer", organizerRouter);
app.use("/event", eventRouter);
app.use("/guestlist", guestListRouter);
app.use("/menu", menuRouter);

// mysqlConnection.query(
//   "SELECT * FROM user limit 2",
//   (err, rows, fields) => {
//     if (!err) {
//       console.log(rows);
//     } else {
//       console.log(err);
//     }
//   }
// );

module.exports = app;
