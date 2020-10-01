const router = require("express").Router();
const guestListController = require("../controller/guestListController");
router
  .route("/")
  .get(guestListController.guestList)
  .post(guestListController.addGuest)
  .delete(guestListController.deleteGuest)
  .patch(guestListController.updatePoints)

module.exports = router;
