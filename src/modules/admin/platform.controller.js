const db = require("../../config/db.js");

exports.platformAnalytics = async (req, res, next) => {
  try {
    const [[institutions]] = await db.execute(
      `SELECT COUNT(*) as total FROM institutions`
    );

    const [[users]] = await db.execute(
      `SELECT COUNT(*) as total FROM users`
    );

    const [[requests]] = await db.execute(
      `SELECT COUNT(*) as total FROM transcript_requests`
    );

    return res.json({
      success: true,
      data: {
        institutions: institutions.total,
        users: users.total,
        requests: requests.total
      }
    });
  } catch (error) {
    next(error);
  }
};