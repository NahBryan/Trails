const crypto = require("crypto");
const db = require("../../config/db.js");
const emailService = require("../../services/email.service.js");
const passwordService = require("../../services/password.service.js");

exports.forgotPassword = async (req, res, next) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    await db.execute(
      `
        UPDATE users
        SET refresh_token = ?
        WHERE email = ?
      `,
      [token, req.body.email]
    );

    const resetUrl = `${process.env.APP_URL}/reset-password/${token}`;

    await emailService.sendMail({
      to: req.body.email,
      subject: "Reset Password",
      html: `<a href="${resetUrl}">Reset Password</a>`
    });

    return res.json({
      success: true,
      message: "Password reset email sent"
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedPassword = await passwordService.hashPassword(
      req.body.password
    );

    await db.execute(
      `
        UPDATE users
        SET password_hash = ?
        WHERE refresh_token = ?
      `,
      [hashedPassword, req.params.token]
    );

    return res.json({
      success: true,
      message: "Password reset successful"
    });
  } catch (error) {
    next(error);
  }
};