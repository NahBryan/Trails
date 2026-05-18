const db = require("../config/db.js");

exports.findByEmail = async email => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0];
};
exports.findIfInstitutionExists = async id => {
  const [rows] = await db.execute(
    "SELECT * FROM institutions WHERE id = ? OR name = ? LIMIT 1",
    [id, id]
  );

  return rows[0];
};
exports.create = async data => {
  const [result] = await db.execute(
    `
    INSERT INTO users (
      institution_id,
      role,
      email,
      password_hash,
      first_name,
      last_name, 
      phone
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [
      data.institutionId,
      "STUDENT",
      data.email,
      data.passwordHash,
      data.firstName,
      data.lastName,
      data.phone
    ]
  );

  return result.insertId;
};