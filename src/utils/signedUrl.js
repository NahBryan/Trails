const jwt = require("jsonwebtoken");

exports.generateSignedUrl = fileUrl => {
  const token = jwt.sign(
    {
      fileUrl
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return `${process.env.APP_URL}/api/documents/secure/${token}`;
};