const mysqlConnection = require("./../connection");

exports.product = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT * FROM giftshop ORDER BY price`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("Store Empty");
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

exports.addProduct = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `INSERT INTO giftshop (modelNo,price,quantity,description,image,name) 
      VALUES 
      (
        '${req.body.modelNo}',
        ${req.body.price},
        ${req.body.quantity},
        '${req.body.description}',
        '${req.body.image}',
        '${req.body.name}'
      )`,
      (err) => {
        if (!err) {
          res.json(giftAdded);
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};


exports.orderedProduct = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT * FROM order `,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("Store Empty");
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

exports.addOrder = async (req, res, next) => { }

exports.basketData = async (req, res, next) => { };

exports.addBasket = async (req, res, next) => { };



exports.updateProduct = async (req, res, next) => { };

exports.deleteProduct = async (req, res, next) => { };
