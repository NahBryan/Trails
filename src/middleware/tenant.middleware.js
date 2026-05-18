module.exports = (req, res, next) => {
  req.tenantId = req.user.institutionId;

  next();
};