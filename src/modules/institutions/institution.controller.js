const institutionRepository = require("../../repositories/institution.repository.js");
const auditService = require("../../services/audit.service.js");

exports.createInstitution = async (req, res, next) => {
  try {
    const institutionId = await institutionRepository.create(req.body);

    await auditService.log({
      actorId: req.user.id,
      institutionId,
      action: "CREATE_INSTITUTION",
      entity: "INSTITUTION",
      entityId: institutionId
    });

    return res.status(201).json({
      success: true,
      data: {
        institutionId
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.suspendInstitution = async (req, res, next) => {
  try {
    await institutionRepository.updateStatus(
      req.params.id,
      "SUSPENDED"
    );

    return res.json({
      success: true,
      message: "Institution suspended"
    });
  } catch (error) {
    next(error);
  }
};