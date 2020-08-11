const mysqlConnection = require("./../connection");

exports.addUser = async (req, res) => {
  try {
    mysqlConnection.query(
      `INSERT INTO user (firstName,lastName,middleName,userName,password,points,email,mobileNo,street,city,provience) 
      VALUES
      (
        '${req.body.firstName}',
        '${req.body.lastName}',
        '${req.body.middleName}',
        '${req.body.userName}',
        '${req.body.password}',
        '${req.body.points}',
        '${req.body.email}',
        '${req.body.mobileNo}',
        '${req.body.street}',
        '${req.body.city}',
        '${req.body.provience}'
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
