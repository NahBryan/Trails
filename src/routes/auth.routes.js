const router = require("express").Router();

const authController = require("../modules/auth/auth.controller.js");
const passwordController = require("../modules/auth/password.controller.js");
const refreshController = require("../modules/auth/refresh.controller.js");
const logoutController = require("../modules/auth/logout.controller.js");

const auth = require("../middleware/auth.middleware.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", refreshController.refresh);
router.post("/forgot-password", passwordController.forgotPassword);
router.post("/reset-password/:token", passwordController.resetPassword);
router.post("/logout", auth, logoutController.logout);
router.get("/profile", auth, authController.profile);

module.exports = router;