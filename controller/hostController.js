const { json } = require("express");
const mysqlConnection = require("./../connection");

exports.hostData = async (req, res, next) => {
  try {
    var sql;
    if (req.query.vatNo == null) {
      sql = ` SELECT hostName,profilePhoto, CONCAT (street,city,provience) AS location,description,vatNo FROM host  WHERE status= 'VERIFIED' ORDER BY hostname `;
    } else {
      sql = ` SELECT * FROM host  WHERE vatNo = "${req.query.vatNo}" AND status= 'VERIFIED' `;
    }
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) {
          res.json("No Host Registered");
        } else {
          if (req.query.vatNo) {
            var sql = `SELECT hallNo,capacity FROM hostHalls WHERE vatNo = ${req.query.vatNo}`;
            mysqlConnection.query(sql, (err, rows1) => {
              if (!err) {
                var sql = `SELECT photo,caption FROM hostPhoto WHERE vatNo = ${req.query.vatNo}`;
                mysqlConnection.query(sql, (err, rows2) => {
                  if (!err) {
                    res.json({ rows, rows1, rows2 });
                  } else {
                    res.json({ error: err });
                  }
                });
              } else {
                res.json({ error: err });
              }
            });
          } else {
            res.json({ status: "success", data: rows });
          }
        }
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateHostData = async (req, res, next) => {
  try {
    var oldhostData = [];
    mysqlConnection.query(
      `SELECT * FROM host WHERE vatNo=${req.body.vatNo}`,
      (err, rows) => {
        if (!err) {
          oldhostData = rows;
          var sql = ` UPDATE host SET 
                  hostName = "${
                    req.body.hostName == undefined
                      ? oldhostData[0].hostName
                      : req.body.hostName
                  }",
                  totalHalls = ${
                    req.body.totalHalls == undefined
                      ? oldhostData[0].totalHalls
                      : req.body.totalHalls
                  },
                  description = "${
                    req.body.description == undefined
                      ? oldhostData[0].description
                      : req.body.description
                  }",
                  profilePhoto = "${
                    req.body.profilePhoto == undefined
                      ? oldhostData[0].profilePhoto
                      : req.body.profilePhoto
                  }",
                  contactInfo = "${
                    req.body.contactInfo == undefined
                      ? oldhostData[0].contactInfo
                      : req.body.contactInfo
                  }",
                  email = "${
                    req.body.email == undefined
                      ? oldhostData[0].email
                      : req.body.email
                  }",
                  street = "${
                    req.body.street == undefined
                      ? oldhostData[0].street
                      : req.body.street
                  }",
                  city = "${
                    req.body.city == undefined
                      ? oldhostData[0].city
                      : req.body.city
                  }",
                  provience = "${
                    req.body.provience == undefined
                      ? oldhostData[0].provience
                      : req.body.provience
                  }",
                  status = "${
                    req.body.status == undefined
                      ? oldhostData[0].status
                      : req.body.status
                  }",
                  latitude = "${
                    req.body.latitude == undefined
                      ? oldhostData[0].latitude
                      : req.body.latitude
                  }",
                  longitude = "${
                    req.body.longitude == undefined
                      ? oldhostData[0].longitude
                      : req.body.longitude
                  }"
                  WHERE vatNo = ${req.body.vatNo} `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              res.json("HOST Data update successful");
            } else {
              res.send(err);
            }
          });
        } else {
          res.send(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.deleteHostData = async (req, res, next) => {
  try {
    var sql = ` DELETE FROM  hostPhoto WHERE vatNo = ${req.query.vatNo} `;
    var sql1 = ` DELETE FROM  hosthalls WHERE vatNo = ${req.query.vatNo} `;
    var sql2 = ` DELETE FROM  host WHERE vatNo = ${req.query.vatNo} `;

    mysqlConnection.query(sql, (err) => {
      if (!err) {
        mysqlConnection.query(sql1, (err) => {
          if (!err) {
            mysqlConnection.query(sql2, (err) => {
              if (!err) {
                res.json("host deleted");
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

exports.addHalls = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO hosthalls (hallNo,vatNo,capacity) VALUES (${req.body.hallNo},${req.body.vatNo},${req.body.capacity}) `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("data upload sucessful");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addPhoto = async (req, res, next) => {
  try {
    var sql = `INSERT INTO hostPhoto (vatNo,caption,photo) VALUES (${req.body.vatNo},"${req.body.caption}","${req.body.photo}") `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("photo uploaded sucesfully");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateHalls = async (req, res, next) => {
  try {
    var sql = ` UPDATE hosthalls SET capacity = ${req.body.capacity} WHERE hallNo=${req.body.hallNo} AND vatNo=${req.body.vatNo} `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("halls updated sucessful");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePhoto = async (req, res, next) => {
  try {
    var sql = `DELETE FROM hostPhoto WHERE photo ="${req.body.photo} AND vatNo = "${req.body.vatNo}" `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("photo deleted sucesfully");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.pendingRequests = (req, res, next) => {
  try {
    var sql = `  SELECT * FROM booking INNER JOIN event e ON e.id = eventId INNER JOIN menu m ON m.eventId = e.id INNER JOIN organizer o ON o.id = e.organizerId Natural JOIN user  WHERE hostStatus='PENDING' AND  vatNo = ${req.query.vatNo}`;
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

exports.approvedRequests = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM booking INNER JOIN event e ON e.id = eventId INNER JOIN menu m ON m.eventId = e.id INNER JOIN organizer o ON o.id = e.organizerId Natural JOIN user WHERE hostStatus= 'APPROVED' AND  vatNo = ${req.query.vatNo}`;
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

exports.upcomingEvent = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM booking INNER JOIN event e ON e.id = eventId INNER JOIN menu m ON m.eventId = e.id INNER JOIN organizer o ON o.id = e.organizerId Natural JOIN user WHERE hostStatus= 'APPROVED' AND  vatNo = ${req.query.vatNo} AND DATEDIFF(eventDate ,CURDATE()) BETWEEN 0 AND 7`;
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

exports.bookedDate = (req, res, next) => {
  try {
    var sql = ` SELECT eventDate FROM booking INNER JOIN event e ON e.id = eventId WHERE hostStatus =  'APPROVED' AND month(eventDate)= ${req.query.month} AND year(eventDate)=${req.query.year} AND vatNo = ${req.query.vatNo} AND hallNo = ${req.query.hallNo}`;
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
