const router = require("express").Router();

const controller = require("../modules/notifications/notification.controller.js");
const auth = require("../middleware/auth.middleware.js");

router.get(
  "/",
  auth,
  controller.getNotifications
);

router.patch(
  "/:id/read",
  auth,
  controller.markAsRead
);

module.exports = router;