const router = require("express").Router();

const controller = require("../modules/admin/admin.controller.js");
const auth = require("../middleware/auth.middleware.js");
const role = require("../middleware/role.middleware.js");

router.get(
  "/dashboard",
  auth,
  role("INSTITUTION_ADMIN", "SUPER_ADMIN"),
  controller.dashboard
);

module.exports = router;