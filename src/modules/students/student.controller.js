const inviteService = require("../../services/invite.service.js");
const emailService = require("../../services/email.service.js");

exports.inviteStudent = async (req, res, next) => {
  try {
    const token = await inviteService.createInvite({
      institutionId: req.user.institutionId,
      email: req.body.email
    });

    const inviteUrl = `${process.env.APP_URL}/accept-invite/${token}`;

    await emailService.sendMail({
      to: req.body.email,
      subject: "Trail Student Invite",
      html: `<p>You have been invited.</p><a href="${inviteUrl}">Accept Invite</a>`
    });

    return res.json({
      success: true,
      message: "Invite sent"
    });
  } catch (error) {
    next(error);
  }
};