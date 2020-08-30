const mysqlConnection = require("./../connection");

exports.invitationRecieved = (req, res, next) => {
  try {
    var sql = ` SELECT eventId FROM guestlist WHERE userName = "${req.query.userName}"`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.mapPointer = (req, res, next) => {
  try {
    var sql = ` SELECT hostName,latitude,longitude FROM host  `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.search = (req, res, next) => {
  try {
    var sql;
    if (req.query.key == "partypalace")
      sql = ` SELECT hostName, CONCAT(street,",",city,",",provience) AS location FROM host WHERE hostName REGEXP "${req.query.value}"  `;
    else if (req.query.key == "user")
      sql = ` SELECT concat(firstName,' ',CASE WHEN (middleName != NULL) THEN middleName ELSE' 'END,lastName) AS name, CONCAT(street,',',city,',',provience) AS location FROM user WHERE userName REGEXP "${req.query.value}"`;
    else if (req.query.key == "band")
      sql = ` SELECT bandName AS Name FROM band WHERE bandName REGEXP "${req.query.value}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) res.json({ status: "no matching data" });
        else res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
