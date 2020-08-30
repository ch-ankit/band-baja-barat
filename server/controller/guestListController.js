const mysqlConnection = require("../connection");

exports.guestList = (req, res, next) => {
  try {
    var sql = ` SELECT g.userName,concat(firstName,' ', CASE WHEN (middleName!= 'NULL') THEN middleName ELSE '' END ,' ',lastName) AS name FROM guestlist g INNER JOIN user u ON g.userName = u.userName WHERE eventId = ${req.query.eventId} `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addGuest = (req, res, next) => {
  try {
    var sql = ` INSERT INTO guestlist (eventId,userName) values(
         ${req.body.eventId},
        "${req.body.userName}"
      )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ status: "guest added" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteGuest = (req, res, next) => {
  try {
    var sql = ` DELETE FROM guestlist WHERE eventId =  ${req.body.eventId} AND userName ="${req.body.userName}" `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ status: "guest deleted" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
