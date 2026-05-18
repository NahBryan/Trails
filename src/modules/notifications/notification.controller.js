const db = require("../../config/db.js");

exports.getNotifications = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `
        SELECT *
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    return res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    await db.execute(
      `
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = ?
        AND user_id = ?
      `,
      [req.params.id, req.user.id]
    );

    return res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};