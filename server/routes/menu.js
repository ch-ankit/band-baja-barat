const router = require("express").Router();
const menuController = require("./../controller/menuController");

router
  .route("/")
  .get(menuController.menu)
  .post(menuController.addMenu)
  .patch(menuController.updateMenu)
  .delete(menuController.deleteMenu);

module.exports = router;
