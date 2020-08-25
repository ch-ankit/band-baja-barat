const router = require("express").Router();
const organizerController = require("../controller/organizerController");

router
  .route("/")
  .get(organizerController.organizer)
  .post(organizerController.addOrganizer)
  .delete(organizerController.deleteOrganizer);

module.exports = router;
