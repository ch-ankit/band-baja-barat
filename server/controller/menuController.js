const mysqlconnection = require("./../connection");
const mysqlConnection = require("./../connection");

exports.menu = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM menu WHERE eventId = ${req.query.eventID} `;
    mysqlConnection.queryy(sql, (err, rows) => {
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

exports.addMenu = (req, res, next) => {
  try {
    var sql = ` INSERT INTO menu (eventId,snacks1,snacks2,snacks3,mainDish1,mainDish2,sideDish1,sideDish2,desert1,desert2,coldDrinks,drinks,specialDish,extra)
                VALUES(
                     ${req.body.eventId},
                    "${req.body.snacks1}",
                    "${req.body.snacks2}",
                    "${req.body.snacks3}",
                    "${req.body.mainDish1}",
                    "${req.body.mainDish2}",
                    "${req.body.sideDish1}",
                    "${req.body.sideDish2}",
                    "${req.body.desert1}",
                    "${req.body.desert2}",
                    "${req.body.coldDrinks}",
                    "${req.body.drinks}",
                    "${req.body.specialDish}",
                    "${req.body.extra}"
                )`;
    mysqlConnection.queryy(sql, (err, rows) => {
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

exports.updateMenu = (req, res, next) => {
  try {
    var oldData = [];
    var sql;
    sql = `SELECT * FROM menu WHERE id=${req.body.menuId} `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        oldData = rows;
        sql = ` UPDATE menu SET 
                      snacks1= "${
                        req.body.snacks1 == undefined
                          ? oldData[0].snacks1
                          : req.body.snacks1
                      }",
                      snacks2= "${
                        req.body.snacks2 == undefined
                          ? oldData[0].snacks2
                          : req.body.snacks2
                      }",
                      snacks3= "${
                        req.body.snacks3 == undefined
                          ? oldData[0].snacks3
                          : req.body.snacks3
                      }",
                      mainDish1= "${
                        req.body.mainDish1 == undefined
                          ? oldData[0].mainDish1
                          : req.body.mainDish1
                      }",
                      mainDish2= "${
                        req.body.mainDish2 == undefined
                          ? oldData[0].mainDish2
                          : req.body.mainDish2
                      }",
                      sideDish1= "${
                        req.body.sideDish1 == undefined
                          ? oldData[0].sideDish1
                          : req.body.sideDish1
                      }",
                      sideDish2= "${
                        req.body.sideDish2 == undefined
                          ? oldData[0].sideDish2
                          : req.body.sideDish2
                      }",
                      desert1= "${
                        req.body.desert1 == undefined
                          ? oldData[0].desert1
                          : req.body.desert1
                      }",
                      desert2= "${
                        req.body.desert2 == undefined
                          ? oldData[0].desert2
                          : req.body.desert2
                      }",
                      coldDrinks= "${
                        req.body.coldDrinks == undefined
                          ? oldData[0].coldDrinks
                          : req.body.coldDrinks
                      }",
                      drinks= "${
                        req.body.drinks == undefined
                          ? oldData[0].drinks
                          : req.body.drinks
                      }",
                      specialDish= "${
                        req.body.specialDish == undefined
                          ? oldData[0].specialDish
                          : req.body.specialDish
                      }",
                      extra= "${
                        req.body.extra == undefined
                          ? oldData[0].extra
                          : req.body.extra
                      }"
                      WHERE  id = ${req.body.menuId}`;
        mysqlConnection.queryy(sql, (err, rows) => {
          if (!err) {
            res.json({ data: rows });
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

exports.deleteMenu = (req, res, next) => {
  try {
    var sql = ` DELETE FROM menu WHERE id = ${req.query.menuId}`;
    mysqlConnection.queryy(sql, (err, rows) => {
      if (!err) {
        res.json({ status: "deleted sucessfully" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
