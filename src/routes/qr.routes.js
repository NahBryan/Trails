const router = require("express").Router();

const controller = require("../modules/qr/qr.controller");

router.post("/verify", controller.verify);

module.exports = router;