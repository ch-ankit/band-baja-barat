const router = require("express").Router();
const signupController = require("../controller/signupController");
//For Login
router.route("/user").post(signupController.adduser);
router.route("/host").post(signupController.addhost);

module.exports = router;
