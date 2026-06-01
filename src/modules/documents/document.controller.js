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

exports.getDocuments = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `
        SELECT tr.id, tr.request_code, tr.status, td.file_url, tr.created_at
        FROM transcript_requests tr
        JOIN transcript_documents td ON tr.id = td.request_id
        WHERE tr.student_id = ?
      `,
      [req.user.id]
    );

    const document = rows;

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    return res.json({
      success: true,
      data: document
    });
  } catch (error) {
    next(error);
  }
};