const router = require("express").Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

module.exports = router;