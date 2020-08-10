const router = require("express").Router();
const giftController = require("../controller/giftController");
//For Login
router.route("/product").get(giftController.product);
// router.route("/host").post(giftController.host);
// router.route("/admin").post(giftController.admin);

module.exports = router;
