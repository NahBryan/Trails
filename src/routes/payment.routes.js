const router = require("express").Router();

const controller = require("../modules/payments/payment.controller");
const auth = require("../middleware/auth.middleware");

router.post(
  "/initialize",
  auth,
  controller.initialize
);

router.post(
  "/webhook",
  controller.webhook
);

module.exports = router;