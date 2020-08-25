const mysqlConnection = require("./../connection");

exports.organizer = async (req, res, next) => {
  try {
    var sql;
    if (req.query.userName) {
      sql = `SELECT * From organizer WHERE userName = "${req.query.userName}"`;
    } else {
      sql = `SELECT * FROM organizer`;
    }
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length != 0) {
          res.json({ status: "registered", data: rows });
        } else {
          res.json({ status: "Not registered", data: [] });
        }
      } else {
        res.json({ error: err });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.addOrganizer = async (req, res, next) => {
  try {
    var sql = `INSERT INTO organizer (userName) VALUES ("${req.body.userName}") `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json("registered");
      } else {
        res.json({ error: err });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrganizer = async (req, res, next) => {
  try {
    var sql = `DELETE FROM organizer WHERE userName ="${req.query.userName}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json(" Organizer Deleted");
      } else {
        res.json({ error: err });
      }
    });
  } catch (error) {
    next(error);
  }
};
