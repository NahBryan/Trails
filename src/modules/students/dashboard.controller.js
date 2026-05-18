const db = require("../../config/db.js");

exports.dashboard = async (req, res, next) => {
  try {
    const [requests] = await db.execute(
      `
        SELECT *
        FROM transcript_requests
        WHERE student_id = ?
        ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    return res.json({
      success: true,
      data: {
        requests
      }
    });
  } catch (error) {
    next(error);
  }
};