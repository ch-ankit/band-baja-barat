const mysqlConnection = require("./../connection");

exports.invitationPrototype = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM invitationprotoype `;
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

exports.invitationDraft = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM invitationdraft WHERE eventId = "${req.query.eventId}" `;
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

exports.addInvitationDraft = (req, res, next) => {
  try {
    var sql = ` INSERT INTO invitationdraft (eventId,backgroundImage1,backgroundImage2,draft) VALUES (
      ${req.body.eventId},
      "${req.body.backgroundImage1}",
      "${req.body.backgroundImage2}",
      "${req.body.draft}"
    )`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ status: "success" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateInvitationDraft = (req, res, next) => {
  try {
    var sql = ` UPDATE invitationdraft SET backgroundImage1 = ${req.body.eventId},backgroundImage2 = "${req.body.backgroundImage1}",draft = "${req.body.backgroundImage2}") WHERE eventId = "${req.body.draft}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ status: "success" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
