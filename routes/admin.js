const router = require("express").Router();
const adminController = require("../controller/adminController");

router.route("/pendingrequest").get(adminController.pendingHostRequest);
router.route("/reorederrequired").get(adminController.productsReorderRequired);
router.route('/partypalace').get(adminController.hostData)

module.exports = router;
