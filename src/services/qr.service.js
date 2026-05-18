const QRCode = require("qrcode");

const jwtService = require("./jwt.service");

exports.generateQr = async payload => {
  const token = jwtService.generateQrToken(payload);

  const qrImage = await QRCode.toDataURL(token);

  return {
    token,
    qrImage
  };
};

exports.verifyQr = token => {
  return jwtService.verifyQrToken(token);
};