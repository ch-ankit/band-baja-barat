const mysqlConnection = require("./../connection");

exports.bandData = async (req, res, next) => {
    try {
        var sql;
        if (req.query.bandName == null) {
            sql = ` SELECT bandName,profilePhoto,CONCAT(left(description,40),'...') AS description FROM band ORDER BY bandName`;
        } else {
            sql = ` SELECT * FROM band  WHERE bandName = "${req.query.bandName}" `;
        }
        mysqlConnection.query(sql, (err, rows) => {
            if (!err) {
                if (rows.length == 0) {
                    res.json({ status: "No band Registered", data: [] });
                } else {
                    res.json({ data: rows });
                }
            } else {
                res.json(err);
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.addbandData = async (req, res, next) => {
    try {
        var sql = ` INSERT INTO band (bandName,description,profilePhoto,contactInfo,email)
        VALUES (
            "${req.body.bandName}",
            "${req.body.description}",
            "${req.body.profilePhoto}",
            "${req.body.contactInfo}",
            "${req.body.email}"
        )`
        mysqlConnection.query(sql, (err) => {
            if (!err) {
                res.json(`${req.body.bandName} added succesfully`)
            } else {
                res.json(err)
            }
        })
    } catch (err) {
        next(err);
    }
}

exports.updatebandData = async (req, res, next) => {
    try {
        var sql = ` UPDATE band SET
                  description = "${req.body.description}",
                  profilePhoto = "${req.body.profilePhoto}",
                  contactInfo = "${req.body.contactInfo}",
                  email = "${req.body.email}",
                  WHERE bandName = ${req.body.bandName} `;
        mysqlConnection.query(sql, (err) => {
            if (!err) {
                res.json("bandData update successful");
            } else {
                res.send(err);
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.deletebandData = async (req, res, next) => {
    try {
        var sql = `DELETE FROM  bandphoto WHERE bandName = ${req.query.bandName} `;
        mysqlConnection.query(sql, (err) => {
            if (!err) {
                res.json("band deleted");
            } else {
                res.json(err);
            }
        });
    } catch (err) {
        next(err);
    }
};