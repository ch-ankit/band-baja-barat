const router = require("express").Router();
const giftController = require("../controller/giftController");
//For Login
router
  .route("/product")
  .get(giftController.product)
  .post(giftController.addProducts);
// router.route("/admin").post(giftController.admin);

router.route("/history").get(giftController.productHistory);

module.exports = router;
