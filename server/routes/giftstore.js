const router = require("express").Router();
const giftController = require("../controller/giftController");
//For Login
router
  .route("/product")
  .get(giftController.product)
  .post(giftController.addProduct);
// router.route("/admin").post(giftController.admin);

router.route("/history").get(giftController.orderedProduct);

module.exports = router;
