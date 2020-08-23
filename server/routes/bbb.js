const router = require("express").Router();
const bbbController = require("../controller/bbbController");

router.route("/host").get(bbbController.hostData);

router.route("/band").get(bbbController.bandData);

router.route("/user").get(bbbController.userName);

module.exports = router;
