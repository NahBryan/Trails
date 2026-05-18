const router = require("express").Router();

const controller = require("../modules/institutions/institution.controller.js");
const auth = require("../middleware/auth.middleware.js");
const role = require("../middleware/role.middleware.js");

router.post(
  "/",
  auth,
  role("SUPER_ADMIN"),
  controller.createInstitution
);

router.patch(
  "/:id/suspend",
  auth,
  role("SUPER_ADMIN"),
  controller.suspendInstitution
);

module.exports = router;