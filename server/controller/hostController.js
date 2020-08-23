const mysqlConnection = require("./../connection");

exports.hostData = async (req, res, next) => {
  try {
    var sql;
    if (req.query.vatNo == null) {
      sql = ` SELECT hostName,profilePhoto, CONCAT (street,city,provience) AS location,description FROM host  ORDER BY hostname `;
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

exports.updateHostData = async (req, res, next) => {
  try {
    var sql = ` UPDATE  host SET 
                  hostName = "${req.body.hostName}",
                  totalHalls = ${req.body.totalHalls},
                  description = "${req.body.description}",
                  profilePhoto = "${req.body.profilePhoto}",
                  contactInfo = "${req.body.contactInfo}",
                  email = "${req.body.email}",
                  street = "${req.body.street}",
                  city = "${req.body.city}",
                  provience = "${req.body.provience}",
                  latitude = "${req.body.latitude}",
                  longitude = "${req.body.longitude}
                  WHERE vatNo = ${req.body.vatNo})`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("HOST Data update successful");
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteHostData = async (req, res, next) => {
  try {
    var sql = ` DELETE FROM  hostphoto WHERE vatNo = ${req.query.vatNo} `;
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
                res.json(err);
              }
            });
          } else {
            res.json(err);
          }
        });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addHalls = async (req, res, next) => {
  var sql = ` INSERT INTO hosthalls (hallNo,vatNo,capacity) VALUES (${req.body.hallNo},${req.body.vatNo},${req.body.capacity}) `;
  mysqlConnection.query(sql, (err) => {
    if (!err) {
      res.json("data upload sucessful");
    } else {
      res.json(err);
    }
  });
};

exports.addPhoto = async (req, res, next) => {
  try {
    var sql = `INSERT INTO hostphoto (vatNo,caption,photo) VALUES (${req.body.vatNo},"${req.body.caption}","${req.body.photo}") `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("photo uploaded sucesfully");
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateHalls = async (req, res, next) => {
  var sql = ` UPDATE hosthalls SET capacity = ${req.body.capacity} WHERE hallNo=${req.body.hallNo} AND vatNo=${req.body.vatNo} `;
  mysqlConnection.query(sql, (err) => {
    if (!err) {
      res.json("halls updated sucessful");
    } else {
      res.json(err);
    }
  });
};

exports.deletePhoto = async (req, res, next) => {
  try {
    var sql = `DELETE FROM hostphoto WHERE photo ="${req.body.photo} AND vatNo = "${req.body.vatNo}" `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("photo deleted sucesfully");
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};
