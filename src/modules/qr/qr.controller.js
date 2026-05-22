const db = require("../../config/db.js");
const qrService = require("../../services/qr.service.js");

exports.verify = async (req, res, next) => {
  try {
    const { token } = req.body;
    if(!token){
      return res.status(400).json({
      success: false,
      verified: false,
      message: "A Token is required to process QR verification"
    });
    }
    const payload = qrService.verifyQr(token);

    await db.execute(
      `
        INSERT INTO qr_verification_logs (
          institution_id,
          request_id,
          verifier_ip,
          result
        )
        VALUES (?, ?, ?, ?)
      `,
      [
        payload.institutionId || 1,
        payload.requestId,
        req.ip,
        true
      ]
    );
    const info = await db.execute(
      "SELECT * FROM transcript_requests WHERE id = ? " ,[payload.requestId]);

    const user_info = await db.execute(`
      SELECT * FROM student_profiles WHERE user_id = ?
      `, [payload.studentId]);

    return res.json({
      success: true,
      verified: true,
      data: payload,
      user: user_info[0][0],
      info: info[0][0]
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      verified: false,
      message: "Invalid QR"
    });
  }
};