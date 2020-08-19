const router = require("express").Router();
const hostController = require("../controller/hostController");

router
  .route("/")
  .get(hostController.hostData)
  .patch(hostController.updateHostData)
  .delete(hostController.deleteHostData);

// router.route("/band").get(hostController.bandData);

// router.route("/user").get(hostController.userName);

module.exports = router;
