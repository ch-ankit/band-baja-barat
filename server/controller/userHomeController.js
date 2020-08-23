const mysqlConnection = require("./../connection");

//hostData bandData userDatas regionanusarhost
//invite recieved

exports.inivitationRecieved = (req, res, next) => {
  try {
    var sql = ` SELECT eventId FROM guestlist WHERE userName = "${req.query.userName}"`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ data: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.hostData = async (req, res, next) => {
  try {
    var sql;
    if (req.query.vatNo == null) {
      sql = ` SELECT hostName,profilePhoto, CONCAT (street,city,provience) AS location,contactInfo FROM host  ORDER BY hostname `;
    } else {
      sql = ` SELECT * FROM host  WHERE vatNo = "${req.query.vatNo}" `;
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
                var sql = `SELECT photo,caption FROM hostphoto WHERE vatNo = ${req.query.vatNo}`;
                mysqlConnection.query(sql, (err, rows2) => {
                  if (!err) {
                    res.json({ rows, rows1, rows2 });
                  } else {
                    res.json(err);
                  }
                });
              } else {
                res.json(err);
              }
            });
          } else {
            res.json({ status: "success", data: rows });
          }
        }
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.bandData = async (req, res, next) => {
  try {
    mysqlConnection.query(`SELECT * FROM band `, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json("No band Registered");
        else res.json({ status: "success", data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.userName = async (req, res, next) => {
  try {
    var sql = `SELECT userName, CONCAT(street,city,provience) AS location FROM user `;
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json("No Host Registered");
        else res.json({ status: "success", data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};
