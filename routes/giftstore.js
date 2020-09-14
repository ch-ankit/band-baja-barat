const router = require("express").Router();
const giftController = require("../controller/giftController");

router
  .route("/product")
  .get(giftController.product)
  .post(giftController.addProduct)
  .patch(giftController.updateProduct)
  .delete(giftController.deleteProduct);

router
  .route("/orders") //
  .get(giftController.orderedProduct)
  .post(giftController.addOrder)
  .patch(giftController.updateOrder)
  .delete(giftController.deleteOrder);

router
  .route("/basket")
  .get(giftController.basketData) // completed
  .post(giftController.addBasket)
  .delete(giftController.deleteBasket)
  .patch(giftController.updateBasket);

router
  .route("/rating")
  .get(giftController.productRating)
  .post(giftController.addRating)
  .patch(giftController.updateRating);

router.route("/search").get(giftController.search);

module.exports = router;
