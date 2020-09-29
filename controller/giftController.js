const mysqlConnection = require("./../connection");

exports.product = async (req, res, next) => {
  try {
    var sql;
    if (req.query.modelNo) {
      sql = ` SELECT * FROM giftShop WHERE modelNo = "${req.query.modelNo}" ORDER BY price `;
    } else {
      sql = `SELECT * FROM giftShop ORDER BY price`;
    }
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json({ message: "Store Empty", data: [] });
        else res.json({ status: "success", data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO giftShop (modelNo,price,quantity,description,summary,photo,name) 
    VALUES 
    (
      "${req.body.modelNo}",
      ${req.body.price},
      ${req.body.quantity},
      "${req.body.description}",
      "${req.body.summary}",
      "${req.body.photo}",
      "${req.body.name}"
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({
          message: `${req.body.modelNo} has been added to the store`,
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT quantity,price,description,summary FROM giftShop WHERE modelNo = "${req.body.modelNo}"`,
      (err, rows) => {
        if (!err) {
          oldData = rows;
          var sql = ` UPDATE giftShop SET quantity=${req.body.quantity == undefined
            ? oldData[0].quantity
            : oldData[0].quantity + parseInt(req.body.quantity)
            },
          price= ${req.body.price == undefined
              ? oldData[0].price
              : parseInt(req.body.price)
            },
          description = "${req.body.description == undefined
              ? oldData[0].description
              : req.body.description
            }",
          summary = "${req.body.summary == undefined
              ? oldData[0].summary
              : req.body.summary
            }" WHERE modelNo = "${req.body.modelNo}"`;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              res.json({
                message: `${req.body.modelNo} quantity updated by ${req.body.quantity == undefined
                  ? oldData[0].quantity
                  : oldData[0].quantity + parseInt(req.body.quantity)
                  } and price is ${req.body.price == undefined
                    ? oldData[0].price
                    : req.body.price
                  } `,
              });
            } else {
              res.json({ error: err });
            }
          });
        } else {
          res.json({ error: err });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    var sql = `DELETE FROM giftShop WHERE modelNo="${req.body.modelNo}"`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({
          status: "success",
          message: `${req.body.modelNo} is deleted `,
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.orderedProduct = async (req, res, next) => {
  try {
    var sql;
    if (req.query.userName == "admin") {
      sql = ` SELECT orderNo,giftId,quantity,price,orderStatus,o.eventId,userName,orderedDate,eventName,CONCAT(street,' ',city,'-',provience) AS location,eventDate FROM orders o INNER JOIN event e ON o.eventId = e.id INNER JOIN booking b ON e.id = b.eventId NATURAL JOIN host ORDER BY eventDate`;
    } else
      sql = ` SELECT orderNo,giftId,quantity,price,orderStatus,eventId,userName,orderedDate,eventName FROM orders o INNER JOIN event e ON o.eventId = e.id WHERE userName="${req.query.userName}" ORDER BY eventDate`;
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json({ message: "No order placed yet", data: [] });
        else res.json({ status: "success", data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO orders (giftId,quantity,price,orderStatus,eventId,userName,orderedDate) VALUES (
      "${req.body.giftId}",
      ${req.body.quantity},
      ${req.body.price},
      "${req.body.orderStatus}",
      ${req.body.eventId},
      "${req.body.userName}",
      "${req.body.orderedDate}"
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({
          message: `${req.body.giftId} added to order by ${req.body.userName}`,
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = (req, res, next) => {
  try {
    var sql = ` UPDATE orders SET orderStatus = '${req.body.status}' WHERE orderNo = ${req.body.orderNo} `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ message: `${req.body.orderNo} status of order changed to ${req.body.status}` });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    var sql = ` DELETE FROM orders WHERE orderNo = ${req.query.orderNo}`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ message: `orderNo ${req.query.orderNo} order deleted` });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.basketData = async (req, res, next) => {
  try {
    var sql = ` SELECT b.*, e.eventName FROM basket b INNER JOIN event e  ON e.id=b.eventId WHERE userName = "${req.query.userName}" `;
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0)
          res.json({ status: "success", data: [], message: "Empty Basket" });
        else res.json({ status: "Items in basket", data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addBasket = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO basket (userName,modelNo,quantity,eventId) VALUES (
      "${req.body.userName}",
      "${req.body.modelNo}",
       ${req.body.quantity},
       ${req.body.eventId}
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({
          status: "success",
          message: `${req.body.modelNo} added to basket`,
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBasket = async (req, res, next) => {
  try {
    var sql = ` UPDATE basket SET quantity=${req.body.quantity} WHERE userName ='${req.body.userName}' AND modelNo= '${req.body.modelNo}' AND eventId=${req.body.eventId}`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("updated in basket");
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBasket = async (req, res, next) => {
  try {
    if (req.query.checkout == 1) {
      var sql = ` DELETE FROM basket WHERE userName ='${req.body.userName}'`;
    } else {
      var sql = ` DELETE FROM basket WHERE userName ='${req.body.userName}' AND modelNo= '${req.body.modelNo}' AND eventId=${req.body.eventId}`;
    }
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({
          message: `${req.body.modelNo} removed from basket`,
          data: [],
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.productRating = async (req, res, next) => {
  try {
    var sql = ` SELECT value FROM rating WHERE userName="${req.query.userName}" AND modelNo="${req.query.modelNo}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.legth === 0)
          res.json({ message: "no previous rating", data: [] });
        else res.json({ message: "success", data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addRating = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO rating (userName, modelNo, value) VALUES (
        "${req.query.userName}",
        "${req.query.modelNo}",
         ${req.body.value}
      )`;
    var sql1 = ` UPDATE giftShop SET rating = CASE rating WHEN 0 THEN ${req.body.value} ELSE rating/2 + ${req.body.value}/2 END WHERE modelNo = "${req.query.modelNo}" `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        mysqlConnection.query(sql1, (err) => {
          if (!err) {
            res.json(
              `${req.query.modelNo} rated ${req.body.value} by ${req.query.userName} `
            );
          } else {
            res.json({ error: err });
          }
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRating = async (req, res, next) => {
  try {
    mysqlConnection.query(
      ` SELECT VALUE FROM rating WHERE userName="${req.query.userName}" AND modelNo="${req.query.modelNo}" `,
      (err, rows) => {
        if (!err) {
          const netRating = (req.body.value - rows[0].VALUE) / 2;
          var sql = ` UPDATE rating SET value= ${req.body.value} WHERE userName="${req.query.userName}" AND modelNo="${req.query.modelNo}"`;
          var sql1 = ` UPDATE giftShop SET rating =rating+ ${netRating} WHERE modelNo = "${req.query.modelNo}" `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              mysqlConnection.query(sql1, (err) => {
                if (!err) {
                  res.json(
                    `${req.query.modelNo} rating updated by ${req.query.userName}`
                  );
                } else {
                  res.json({ error: err });
                }
              });
            } else {
              res.json({ error: err });
            }
          });
        } else {
          next(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.search = (req, res, next) => {
  try {
    var sql = ` SELECT name,photo,modelNo FROM giftShop WHERE name REGEXP "${req.query.value}"  `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        if (rows.length == 0)
          res.json({ status: "no matching data", data: [] });
        else res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
