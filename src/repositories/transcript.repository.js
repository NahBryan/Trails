const db = require("../config/db.js");

exports.findByInstitution = async institutionId => {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM transcript_requests
      WHERE institution_id = ?
      ORDER BY created_at DESC
    `,
    [institutionId]
  );

  return rows;
};

exports.findOne = async (institutionId, id) => {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM transcript_requests
      WHERE institution_id = ?
      AND id = ?
      LIMIT 1
    `,
    [institutionId, id]
  );

  return rows[0];
};