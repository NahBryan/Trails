const router = require("express").Router();

const controller = require("../modules/students/student.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const tenant = require("../middleware/tenant.middleware");
const request = require("../modules/transcript/transcript.request.controller.js")
router.post(
  "/invite",
  auth,
  tenant,
  role("INSTITUTION_ADMIN"),
  controller.inviteStudent
);

router.post(
  "/create_request",
  auth,
  role("STUDENT"),
  request.createRequest
);
module.exports = router;