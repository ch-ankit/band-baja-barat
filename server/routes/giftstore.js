const router = require("express").Router();
const giftController = require("../controller/giftController");
//For Login
router
  .route("/product")
  .get(giftController.product)
  .post(giftController.addProduct)
  .patch(giftController.updateProduct)
  .delete(giftController.deleteProduct);

// router.route("/admin").post(giftController.admin);

router
  .route("/orders")
  .get(giftController.orderedProduct)
  .post(giftController.addOrder)
  .delete(giftController.deleteOrder);

router
  .route("/basket")
  .get(giftController.basketData)
  .post(giftController.addBasket)
  .delete(giftController.deletebasket)
  .patch(giftController.updatebasket);

module.exports = router;
