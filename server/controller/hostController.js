const mysqlConnection = require("./../connection");

exports.hostData = async (req, res, next) => {
  try {
    var sql = ` SELECT * FROM host  ORDER BY hostname `;
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

exports.addPhoto = async (req, res, next) => {};
