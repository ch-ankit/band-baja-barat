const router = require("express").Router();
const hostController = require("../controller/hostController");

router
  .route("/")
  .get(hostController.hostData)
  .patch(hostController.updateHostData)
  .delete(hostController.deleteHostData);

router
  .route("/addphoto")
  .post(hostController.addPhoto)
  .delete(hostController.deletePhoto);

router
  .route("addHalls")
  .post(hostController.addHalls)
  .patch(hostController.updateHalls);

module.exports = router;
