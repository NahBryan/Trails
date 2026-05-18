const transcriptService = require("../../services/transcript.service.js");
const auditService = require("../../services/audit.service.js");

exports.createRequest = async (req, res, next) => {
  try {
    const requestId = await transcriptService.createRequest({
      institutionId: req.user.institutionId,
      studentId: req.user.id,
      purpose: req.body.purpose,
      deliveryMethod: req.body.deliveryMethod,
      amount: req.body.amount
    });

    await auditService.log({
      actorId: req.user.id,
      institutionId: req.user.institutionId,
      action: "CREATE_TRANSCRIPT_REQUEST",
      entity: "TRANSCRIPT_REQUEST",
      entityId: requestId
    });

    return res.status(201).json({
      success: true,
      data: {
        requestId
      }
    });
  } catch (error) {
    next(error);
  }
};