const db = require("../../config/db.js");

exports.download = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `
        SELECT *
        FROM transcript_documents
        WHERE request_id = ?
        LIMIT 1
      `,
      [req.params.requestId]
    );

    const document = rows[0];

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    return res.json({
      success: true,
      data: {
        url: document.file_url
      }
    });
  } catch (error) {
    next(error);
  }
};