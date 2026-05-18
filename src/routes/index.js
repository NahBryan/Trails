const router = require("express").Router();

router.use("/auth", require("./auth.routes.js"));
router.use("/institutions", require("./institution.routes.js"));
router.use("/students", require("./student.routes.js"));
router.use("/transcripts", require("./transcript.routes.js"));
router.use("/payments", require("./payment.routes.js"));
router.use("/notifications", require("./notification.routes.js"));
router.use("/documents", require("./document.routes.js"));
router.use("/admin", require("./admin.routes.js"));
router.use("/qr", require("./qr.routes.js"));
router.use("/health", require("./health.routes.js"));

module.exports = router;