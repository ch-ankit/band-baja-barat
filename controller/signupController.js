const mysqlConnection = require("./../connection");

exports.addUser = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `INSERT INTO user (firstName,lastName,middleName,userName,points,photo,email,mobileNo,street,city,provience) 
      VALUES
      (
        "${req.body.firstName}",
        "${req.body.lastName}",
        "${req.body.middleName}",
        "${req.body.userName}",
        1,
        "${req.body.photo}",
        "${req.body.email}",
        "${req.body.mobileNo}",
        "${req.body.street}",
        "${req.body.city}",
        "${req.body.provience}"
      )`,
      (err) => {
        if (!err) {
          res.json(" USER Sign up successful");
        } else {
          res.json({ error: err });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.addHost = async (req, res, next) => {
  try {
    console.log(req.body)
    var sql =
      `INSERT INTO host (vatNo,hostName,email,profilePhoto,totalHalls,contactInfo,street,city,provience,latitude,longitude)
    VALUES (${parseInt(req.body.vatNo)},
      "${req.body.hostName}",
      "${req.body.email}",
      "${req.body.profilePhoto}",
       ${req.body.totalHalls},
      "${req.body.contactInfo}",
      "${req.body.street}",
      "${req.body.city}",
      "${req.body.provience}",
      ${req.body.latitude},
      ${req.body.longitude}
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("HOST Sign up successful");
      } else {
        res.json({ error: err });
        console.log(err)
      }
    });
  } catch (err) {
    next(err);
  }
};
