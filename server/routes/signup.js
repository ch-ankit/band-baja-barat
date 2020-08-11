const router = require("express").Router();
const signupController = require("../controller/signupController");
//For Login
router.route("/user").post(signupController.addUser);
router.route("/host").post(signupController.addHost);

module.exports = router;
