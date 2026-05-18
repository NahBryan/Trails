const db = require("../../config/db.js");
const qrService = require("../../services/qr.service.js");
const pdfService = require("../../services/pdf.service.js");
const blobService = require("../../services/blob.service.js");

exports.approveRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const [rows] = await db.execute(
      `
        SELECT tr.*, u.first_name, u.last_name,
        sp.program, sp.matricule,
        i.name as institution_name,
        i.code as institution_code
        FROM transcript_requests tr
        JOIN users u ON tr.student_id = u.id
        JOIN student_profiles sp ON sp.user_id = u.id
        JOIN institutions i ON i.id = tr.institution_id
        WHERE tr.id = ?
      `,
      [requestId],
    );

    const request = rows[0];
    const qr = await qrService.generateQr({
      requestId,
      studentId: request.student_id,
      institutionCode: request.institution_code,
      issuedAt: new Date(),
      approvedAt: new Date(),
    });
    const pdfPath = await pdfService.generateTranscriptPdf({
      requestId,
      institutionName: request.institution_name,
      institutionCode: request.institution_code,
      purpose: request.purpose,
      amount: request.amount,
      request_code: request.request_code,
      studentName: `${request.first_name} ${request.last_name}`,
      matricule: request.matricule,
      program: request.program,
      qrImage: qr.qrImage,
    });

    const fileUrl = await blobService.uploadFile(pdfPath, `${requestId}.pdf`);

    await db.execute(
      `
        INSERT INTO transcript_documents (
          institution_id,
          request_id,
          file_url,
          qr_token
        )
        VALUES (?, ?, ?, ?)
      `,
      [request.institution_id, requestId, fileUrl, qr.token],
    );

    await db.execute(
      `
        UPDATE transcript_requests
        SET status = 'GENERATED',
        approved_by = ?,
        approved_at = NOW()
        WHERE id = ?
      `,
      [req.user.id, requestId],
    );

    return res.json({
      success: true,
      data: {
        fileUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
