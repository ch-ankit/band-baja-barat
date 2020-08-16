const mysqlConnection = require("./../connection");

exports.user = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT * FROM user WHERE  userName="${req.body.userName}" AND password="${req.body.password}"`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0)
            res.json({ status: "login failed", data: rows });
          else res.json({ status: "login success", data: rows });
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.host = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT vatNo,password FROM host WHERE  vatNo="${req.body.vatNo}" AND password="${req.body.password}"`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("LOGIN ERROR");
          else res.json("LOGIN SUCCESSFUL");
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.admin = async (req, res, next) => {
  try {
    const userDetails = mysqlConnection.query(
      `SELECT userName,password FROM admin WHERE  userName="${req.body.userName}" AND password="${req.body.password}"`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("LOGIN ERROR");
          else res.json("LOGIN SUCCESSFUL");
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
