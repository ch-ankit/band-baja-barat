const mysqlConnection = require("./../connection");

exports.invitationPrototype = (req, res, next) => {
  try {
    var sql = ` SELECT * FROM invitationPrototype `;
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
    var sql = ` SELECT * FROM invitationDraft WHERE eventId = "${req.query.eventId}" `;
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
    var sql = ` INSERT INTO invitationDraft 
    (eventId,backgroundImage1,backgroundImage2,draft,groomFather,groomMother,brideMother,brideFather,honorableMention1,honorableMention2)
     VALUES (
      ${req.body.eventId},
      "${req.body.backgroundImage1}",
      "${req.body.backgroundImage2}",
      "${req.body.draft}",
      "${req.body.groomFather}",
      "${req.body.groomMother}",
      "${req.body.brideMother}",
      "${req.body.brideFather}",
      "${req.body.honorableMention1}",
      "${req.body.honorableMention2}"
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

exports.updateInvitationDraft = async (req, res, next) => {
  try {
    var oldDraftData = [];
    mysqlConnection.query(
      `SELECT * FROM invitationDraft WHERE eventId=${req.body.eventId}`,
      (err, rows) => {
        if (!err) {
          oldDraftData = rows;
          console.log(oldDraftData);
          var sql = ` UPDATE invitationDraft SET 
                  draft = "${
                    req.body.draft == undefined
                      ? oldDraftData[0].draft
                      : req.body.draft
                  }",
                  backgroundimage1 = "${
                    req.body.backgroundimage1 == undefined
                      ? oldDraftData[0].backgroundimage1
                      : req.body.backgroundimage1
                  }",
                  backgroundimage1 = "${
                    req.body.backgroundimage1 == undefined
                      ? oldDraftData[0].backgroundimage1
                      : req.body.backgroundimage1
                  }",
                  groomFather="${req.body.groomFather}",
                  "${req.body.groomMother}",
                  "${req.body.brideMother}",
                  "${req.body.brideFather}",
                  "${req.body.honorableMention1}",
                  "${req.body.honorableMention2}"
                  WHERE eventId = ${req.body.eventId} `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              res.json("Invitation Draft update successful");
            } else {
              res.json({ error: err });
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.deleteInvitationDraft = (req, res, next) => {
  try {
    var sql = ` DELETE FROM invitationDraft WHERE eventId = "${req.query.eventId}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({
          status: ` Invitation of event with ${req.query.eventId}" id deleted `,
        });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
