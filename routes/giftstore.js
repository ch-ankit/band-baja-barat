const router = require("express").Router();
const giftController = require("../controller/giftController");

router
  .route("/product")
  .get(giftController.product) //complete
  .post(giftController.addProduct) //completed
  .patch(giftController.updateProduct) //admin + user buy #remaining work
  .delete(giftController.deleteProduct); //completed

router
  .route("/orders") //Whole Remaining
  .get(giftController.orderedProduct)
  .post(giftController.addOrder)
  .delete(giftController.deleteOrder);

router
  .route("/basket")
  .get(giftController.basketData) // completed
  .post(giftController.addBasket) //completed
  .delete(giftController.deleteBasket) //completed
  .patch(giftController.updateBasket); //completed

router
  .route("/rating")
  .get(giftController.productRating) //completed
  .post(giftController.addRating) //completed
  .patch(giftController.updateRating); //completed

router.route("/search").get(giftController.search);//completed

module.exports = router;
