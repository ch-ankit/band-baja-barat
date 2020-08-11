const mysqlConnection = require("./../connection");

exports.hostData = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT * FROM host ORDER BY hostname`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("No Host Registered");
          else res.json({ status: "success", data: rows });
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.addHostData = async (req, res, next) => {
  try {
    console.log(req.body);
    mysqlConnection.query(
      `INSERT INTO host (vatNo,password,capacity,hostLocation,email,contactInfo,hostName,latitude,longitude,photo,description,hallsNumber)
        VALUES
        (
          "${req.body.vatNo}",
          "${req.body.password}",
          ${req.body.capacity},
          "${req.body.hostLocation}",
          "${req.body.email}",
          "${req.body.contactInfo}",
          "${req.body.hostName}",
          "${req.body.latitude}",
          "${req.body.longitude}",
          "${req.body.photo}",
          "${req.body.description}",
          ${req.body.hallsNumber}
        )`,
      (err) => {
        if (!err) {
          res.json("HOST Sign up successful");
        } else {
          res.send(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
