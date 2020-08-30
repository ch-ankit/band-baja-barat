const mysqlConnection = require("./../connection");

exports.booking = (req, res, next) => {
  try {
    var sql;
    if (req.query.eventId) {
      sql = ` SELECT eventName,hostName,hallNo,eventDate,shift,expectedGuestNo FROM booking b  INNER JOIN event e ON b.eventId= e.id INNER JOIN host h ON b.vatNo = h.vatNo WHERE eventId = "${req.query.eventId}" `;
    } else if (req.query.vatNo) {
      sql = ` SELECT eventName,hostName,hallNo,eventDate,shift,expectedGuestNo FROM booking b  INNER JOIN event e ON b.eventId= e.id INNER JOIN host h ON b.vatNo = h.vatNo WHERE vatNo = "${req.query.vatNo}" AND eventDate > CURDATE() `;
    } else {
      sql = ` SELECT eventName,hostName,hallNo,eventDate,shift,expectedGuestNo FROM booking b  INNER JOIN event e ON b.eventId= e.id INNER JOIN host h ON b.vatNo = h.vatNo WHERE eventStatus != 'completed'`;
    }
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

exports.addbooking = (req, res, next) => {
  try {
    var sql = `INSERT INTO booking (eventId,vatNo,hallNo,expectedGuestNo) VALUES (
        ${req.body.eventId},
        ${req.body.vatNo},
        "${req.body.hallNo}",
        "${req.body.expectedGuestNo}"
        )`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ status: "booking added successfully" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deletebooking = (req, res, next) => {
  try {
    var sql = ` DELETE FROM booking WHERE eventId = ${req.query.eventId} `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("booking deleted sucessfully");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
