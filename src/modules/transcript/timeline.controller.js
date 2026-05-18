const db = require("../../config/db.js");

exports.timeline = async (req, res, next) => {
  try {
    const [logs] = await db.execute(
      `
        SELECT *
        FROM audit_logs
        WHERE entity_id = ?
        ORDER BY created_at ASC
      `,
      [req.params.id]
    );

    return res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
};