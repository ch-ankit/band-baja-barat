const router = require("express").Router();
const eventController = require("./../controller/eventController");

router
  .route("/")
  .get(eventController.event)
  .post(eventController.addEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
