const jwt = require("jsonwebtoken");

exports.secureDownload = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.JWT_ACCESS_SECRET
    );

    return res.redirect(decoded.fileUrl);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid signed URL"
    });
  }
};