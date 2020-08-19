const mysqlConnection = require("./../connection");

exports.oragnizer = async (req, res, next) => {
  try {
    var sql;
    if ("${req.query.userName}" == "admin") {
      sql = `SELECT * FROM organizer`;
    } else {
      sql = `SELECT * From organizer WHERE userName = "${req.query.userName}"`;
    }
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) {
          res.json({ status: "registered", data: rows });
        } else {
          res.json({ status: "Not registered" });
        }
      } else {
        res.json(err);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.addOragnizer = async (req, res, next) => {
  try {
    var sql = `INSERT INTO organizer (userName) VALUES ("${req.body.userName}") `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json("registered");
      } else {
        res.json(err);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOragnizer = async (req, res, next) => {
  try {
    var sql = `DELETE FROM organizer WHERE userName ="${req.body.userName}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json(" Organizer Deleted");
      } else {
        res.json(err);
      }
    });
  } catch (error) {
    next(error);
  }
};
