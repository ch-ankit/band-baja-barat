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

exports.hostData = async (req, res, next) => {
  try {
    var sql;
    if (req.query.vatNo == null) {
      sql = ` SELECT hostName,profilePhoto, CONCAT (street,city,provience) AS location,description,vatNo FROM host ORDER BY hostname `;
    } else {
      sql = ` SELECT * FROM host  WHERE vatNo = "${req.query.vatNo}"`;
    }
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0) {
          res.json("No Host Registered");
        } else {
          if (req.query.vatNo) {
            var sql = `SELECT hallNo,capacity FROM hostHalls WHERE vatNo = ${req.query.vatNo}`;
            mysqlConnection.query(sql, (err, rows1) => {
              if (!err) {
                var sql = `SELECT photo,caption FROM hostPhoto WHERE vatNo = ${req.query.vatNo}`;
                mysqlConnection.query(sql, (err, rows2) => {
                  if (!err) {
                    res.json({ rows, rows1, rows2 });
                  } else {
                    res.json({ error: err });
                  }
                });
              } else {
                res.json({ error: err });
              }
            });
          } else {
            res.json({ status: "success", data: rows });
          }
        }
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};