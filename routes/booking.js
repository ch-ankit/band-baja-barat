const router = require("express").Router();
const bookingController = require("./../controller/bookingController");

router
  .route("/")
  .get(bookingController.booking)
  .post(bookingController.addbooking)
  .delete(bookingController.deletebooking);

module.exports = router;
