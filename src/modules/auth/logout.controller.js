const db = require("../../config/db.js");

exports.logout = async (req, res, next) => {
  try {
    await db.execute(
      `
        UPDATE users
        SET refresh_token = NULL
        WHERE id = ?
      `,
      [req.user.id]
    );

    return res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};