const mysqlConnection = require("./../connection");

exports.product = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT * FROM giftshop ORDER BY price`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("Store Empty");
          else res.json(rows);
          console.log(rows);
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
