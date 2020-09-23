const mysqlConnection = require("./../connection");

exports.pendingHostRequest = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM host  WHERE status = 'PENDING' `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) {
          res.json({ status: "No request pending", data: [] });
        } else {
          res.json({ data: rows });
        }
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
    a;
  }
};

exports.productsReorderRequired = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM giftShop  WHERE quantity <= 5 `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) {
          res.json({ status: "No product need to be reordered", data: [] });
        } else {
          res.json({ data: rows });
        }
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
