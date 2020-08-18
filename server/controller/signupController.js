const mysqlConnection = require("./../connection");

exports.addUser = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `INSERT INTO user (firstName,lastName,middleName,userName,password,points,photo,email,mobileNo,street,city,provience) 
      VALUES
      (
        "${req.body.firstName}",
        "${req.body.lastName}",
        "${req.body.middleName}",
        "${req.body.userName}",
        "${req.body.password}",
        "${req.body.points}",
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
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.addHost = async (req, res, next) => {
  try {
    console.log(req.body);
    mysqlConnection.query(
      `INSERT INTO host (vatNo,password,hostName,email,profilePhoto,totalHalls,contactInfo,street,city,provience,latitude,longitude)
      VALUES
      (
         ${req.body.vatNo},
        "${req.body.password}",
        "${req.body.hostName}",
        "${req.body.email}",
        "${req.body.profilePhoto}",
         ${req.body.totalHalls},
        "${req.body.contactInfo}",
        "${req.body.street}",
        "${req.body.city}",
        "${req.body.provience}",
        "${req.body.latitude}",
        "${req.body.longitude}"
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
