const db = require("../../config/db.js");

exports.dashboard = async (req, res, next) => {
  try {
    const institutionId = req.user.institutionId;

    const [[students]] = await db.execute(
      `
        SELECT COUNT(*) as total
        FROM users
        WHERE institution_id = ?
        AND role = 'STUDENT'
      `,
      [institutionId]
    );

    const [[requests]] = await db.execute(
      `
        SELECT COUNT(*) as total
        FROM transcript_requests
        WHERE institution_id = ?
      `,
      [institutionId]
    );

    const [[payments]] = await db.execute(
      `
        SELECT SUM(amount) as revenue
        FROM payments
        WHERE institution_id = ?
        AND status = 'SUCCESS'
      `,
      [institutionId]
    );

    return res.json({
      success: true,
      data: {
        students: students.total,
        requests: requests.total,
        revenue: payments.revenue || 0
      }
    });
  } catch (error) {
    next(error);
  }
};