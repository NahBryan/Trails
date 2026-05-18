const router = require("express").Router();

const controller = require("../modules/documents/document.controller.js");
const auth = require("../middleware/auth.middleware.js");

router.get(
  "/:requestId/download",
  auth,
  controller.download
);

module.exports = router;