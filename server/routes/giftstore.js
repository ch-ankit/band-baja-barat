const router = require("express").Router();
const giftController = require("../controller/giftController");

router
  .route("/product")
  .get(giftController.product)
  .post(giftController.addProduct)
  .patch(giftController.updateProduct)
  .delete(giftController.deleteProduct);

router
  .route("/orders")
  .get(giftController.orderedProduct)
  .post(giftController.addOrder)
  .delete(giftController.deleteOrder);

router
  .route("/basket")
  .get(giftController.basketData)
  .post(giftController.addBasket)
  .delete(giftController.deleteBasket)
  .patch(giftController.updateBasket);

router
  .route("/rating")
  .get(giftController.productRating)
  .post(giftController.addRating)
  .patch(giftController.updateRating);

module.exports = router;
