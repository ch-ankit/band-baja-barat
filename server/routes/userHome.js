const router = require("express").Router();
const userHomeController = require("../controller/userHomeController");

router
    .route("/")
    .get(userHomeController.mapPointer)

router
    .route("/invitationrecieved")
    .get(userHomeController.invitationRecieved)

router
    .route("/search")
    .get(userHomeController.search)


module.exports = router;