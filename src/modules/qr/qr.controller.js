const db = require("../../config/db.js");
const qrService = require("../../services/qr.service.js");

exports.verify = async (req, res, next) => {
  try {
    const { token } = req.body;

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

    return res.json({
      success: true,
      verified: true,
      data: payload
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      verified: false,
      message: "Invalid QR"
    });
  }
};