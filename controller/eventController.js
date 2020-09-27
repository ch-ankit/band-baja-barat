const mysqlConnection = require("./../connection");

exports.event = (req, res, next) => {
  try {
    var sql;
    if (req.query.organizerId) {
      sql = ` SELECT e.id,eventName,CONCAT(groomName," ","WEDS"," ",brideName) AS agenda,eventDate,shift,eventStatus,hostStatus,CONCAT((DATEDIFF(eventDate,CURDATE())),' '',DAYS') AS 'Event In' FROM event e INNER JOIN organizer o ON organizerId= o.id WHERE organizerId = "${req.query.organizerId}" ORDER BY e.id DESC `;
    } else {
      sql = ` SELECT e.id,eventName,eventStatus,hostStatus,userName,eventDate,CONCAT((DATEDIFF(eventDate,CURDATE()),' '',DAYS') AS 'Event In' FROM event e INNER JOIN organizer o ON organizerId= o.id ORDER BY e.id DESC`;
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

exports.addEvent = (req, res, next) => {
  try {
    var sql = `INSERT INTO event (organizerId,eventName,groomName,brideName,eventDate,shift) VALUES (
        ${req.body.organizerId},
        "${req.body.eventName}",
        "${req.body.groomName}",
        "${req.body.brideName}",
        "${req.body.eventDate}",
        "${req.body.shift}"
        )`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json("event added successfully");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    var oldEventData = [];
    mysqlConnection.query(
      `SELECT * FROM event WHERE id=${req.body.eventId}`,
      (err, rows) => {
        if (!err) {
          console.log(rows);
          oldEventData = rows;
          console.log(oldEventData);
          var sql = ` UPDATE event SET 
                    eventName = "${
                      req.body.eventName == undefined
                        ? oldEventData[0].eventName
                        : req.body.eventName
                    }",
                    brideName = "${
                      req.body.brideName == undefined
                        ? oldEventData[0].brideName
                        : req.body.brideName
                    }",
                    groomName = "${
                      req.body.groomName == undefined
                        ? oldEventData[0].groomName
                        : req.body.groomName
                    }",
                    eventDate = "${
                      req.body.eventDate == undefined
                        ? oldEventData[0].eventDate
                        : req.body.eventDate
                    }",
                    shift = "${
                      req.body.shift == undefined
                        ? oldEventData[0].shift
                        : req.body.shift
                    }",
                    hostStatus ="${
                      req.body.hostStatus == undefined
                        ? oldEventData[0].hostStatus
                        : req.body.hostStatus
                    }",
                    eventStatus ="${
                      req.body.eventStatus == undefined
                        ? oldEventData[0].eventStatus
                        : req.body.eventStatus
                    }"
                    WHERE id = ${req.body.eventId} `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              res.json("Event update successful");
            } else {
              res.json({ error: err });
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = (req, res, next) => {
  try {
    var sql = ` DELETE FROM guestList WHERE eventId = ${req.query.eventId} `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        var sql = ` DELETE FROM orders WHERE eventId = ${req.query.eventId} `;
        mysqlConnection.query(sql, (err) => {
          if (!err) {
            var sql = ` DELETE FROM menu WHERE eventId = ${req.query.eventId} `;
            mysqlConnection.query(sql, (err) => {
              if (!err) {
                var sql = ` DELETE FROM invitationDraft WHERE eventId = ${req.query.eventId} `;
                mysqlConnection.query(sql, (err) => {
                  if (!err) {
                    var sql = ` DELETE FROM booking WHERE eventId = ${req.query.eventId} `;
                    mysqlConnection.query(sql, (err) => {
                      if (!err) {
                        var sql = ` DELETE FROM event WHERE id = ${req.query.eventId} `;
                        mysqlConnection.query(sql, (err) => {
                          if (!err) {
                            res.json("event deleted sucessfully");
                          } else {
                            res.json({ error: err });
                          }
                        });
                      } else {
                        res.json({ error: err });
                      }
                    });
                  } else {
                    res.json({ error: err });
                  }
                });
              } else {
                res.json({ error: err });
              }
            });
          } else {
            res.json({ error: err });
          }
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
