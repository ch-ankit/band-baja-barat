const mysqlConnection = require("../connection");

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

exports.bandData = async (req, res, next) => {
  try {
    mysqlConnection.query(`SELECT * FROM band `, (err, rows, fields) => {
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

exports.userName = async (req, res, next) => {
  try {
    var sql = `SELECT userName FROM user `;
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
