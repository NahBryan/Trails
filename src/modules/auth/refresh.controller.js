const jwtService = require("../../services/jwt.service.js");

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const decoded = jwtService.verifyRefreshToken(
      refreshToken
    );

    const accessToken = jwtService.generateAccessToken({
      id: decoded.id,
      role: decoded.role,
      institutionId: decoded.institutionId
    });

    return res.json({
      success: true,
      data: {
        accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};