const router = require("express").Router();

const controller = require("../modules/transcript/transcript.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.patch(
  "/:id/approve",
  auth,
  role("STUDENT"),
  controller.approveRequest
);

module.exports = router;