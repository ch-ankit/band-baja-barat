const mysqlConnection = require("./../connection");

exports.invitationRecieved = (req, res, next) => {
  try {
    var sql = ` SELECT eventId FROM guestList WHERE userName = "${req.query.userName}"`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ error: err, data: [] });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.mapPointer = (req, res, next) => {
  try {
    var sql = ` SELECT hostName,vatNo,latitude,longitude FROM host  `;
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

exports.search = (req, res, next) => {
  try {
    var sql;
    if (req.query.key == "partypalace")
      sql = ` SELECT hostName, longitude,latitude,vatNo,CONCAT(street,",",city,",",provience) AS location FROM host WHERE hostName REGEXP "${req.query.value}"  `;
    else if (req.query.key == "user")
      sql = ` SELECT concat(firstName,' ',CASE WHEN (middleName != NULL) THEN middleName ELSE' 'END,lastName) AS name, CONCAT(street,',',city,',',provience) AS location FROM user WHERE firstName REGEXP "${req.query.value}" OR lastName REGEXP "${req.query.value}"`;
    else if (req.query.key == "band")
      sql = ` SELECT bandName AS Name FROM band WHERE bandName REGEXP "${req.query.value}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) res.json({ status: "no matching data" });
        else res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.userCheck = (req, res, next) => {
  try {
    var sql = `SELECT userName FROM user WHERE userName = "${req.query.userName}"`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) {
          res.json({ data: false });
        } else {
          res.json({ data: true });
        }
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUsers = (req, res, next) => {
  try {
    var oldData = [];
    mysqlConnection.query(
      `SELECT * FROM user WHERE userName="${req.body.userName}"`,
      (err, rows) => {
        if (!err) {
          console.log(req.body.points)
          oldData = rows;
          var sql = ` UPDATE user SET 
                  points = ${req.body.points == undefined
              ? oldData[0].points
              : oldData[0].points + parseInt(req.body.points)
            },
                  mobileNo = "${req.body.mobileNo == undefined
              ? oldData[0].mobileNo
              : req.body.mobileNo
            }",
                  street = "${req.body.street == undefined
              ? oldData[0].street
              : req.body.street
            }",
                  city = "${req.body.city == undefined ? oldData[0].city : req.body.city
            }",
                  provience = "${req.body.provience == undefined
              ? oldData[0].provience
              : req.body.provience
            }",
                  photo = "${req.body.photo == undefined
              ? oldData[0].photo
              : req.body.photo
            }"
                  WHERE userName = "${req.body.userName}" `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              res.json({
                status: "success",
                message: "User Data update successful",
              });
            } else {
              res.json({ error: err });
            }
          });
        } else {
          res.json({ error: err });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.myEvents = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM booking INNER JOIN event e ON e.id = eventId INNER JOIN organizer o ON o.id = e.organizerId Natural JOIN user  WHERE userName = '${req.query.userName}'`;
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
