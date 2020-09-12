const router = require("express").Router();
const bandController = require("../controller/bandController");

router
    .route("/")
    .get(bandController.bandData)
    .post(bandController.addbandData)
    .patch(bandController.updatebandData)
    .delete(bandController.deletebandData);

module.exports = router;