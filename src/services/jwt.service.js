const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.generateAccessToken = payload => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES
  });
};

exports.generateRefreshToken = payload => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES
  });
};

exports.verifyAccessToken = token => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

exports.verifyRefreshToken = token => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};

exports.generateQrToken = payload => {
  return jwt.sign(payload, env.JWT_QR_SECRET, {
    expiresIn: "365d"
  });
};

exports.verifyQrToken = token => {
  return jwt.verify(token, env.JWT_QR_SECRET);
};