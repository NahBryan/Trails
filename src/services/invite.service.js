const crypto = require("crypto");
const db = require("../config/db");

exports.createInvite = async payload => {
  const token = crypto.randomBytes(32).toString("hex");

  await db.execute(
    `
      INSERT INTO invites (
        institution_id,
        email,
        token,
        expires_at
      )
      VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
    `,
    [payload.institutionId, payload.email, token]
  );

  return token;
};

exports.findInvite = async token => {
  const [rows] = await db.execute(
    `
      SELECT * FROM invites
      WHERE token = ?
      AND used = FALSE
      LIMIT 1
    `,
    [token]
  );

  return rows[0];
};