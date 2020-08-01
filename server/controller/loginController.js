const mysqlConnection = require('./../connection');

exports.user = async (req, res, next) => {
  try {
    const userDetails = mysqlConnection.query(
      "SELECT userName,password FROM user WHERE userName LIKE '%al%'",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          res.send(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
