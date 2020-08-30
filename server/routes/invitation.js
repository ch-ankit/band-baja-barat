const router = require("express").Router();
const invitationController = require("./../controller/invitationController");

router
  .route("/draft")
  .get(invitationController.invitationDraft)
  .post(invitationController.addInvitationDraft)
  .patch(invitationController.updateInvitationDraft)
  .delete(invitationController.deleteInvitationDraft);

router.route("/prototype").get(invitationController.invitationPrototype);

module.exports = router;
