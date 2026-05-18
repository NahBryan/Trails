const db = require("../config/db.js");

exports.createProfile = async payload => {
  const [result] = await db.execute(
    `
      INSERT INTO student_profiles (
        institution_id,
        user_id,
        matricule,
        program,
        faculty,
        graduation_year
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      payload.institutionId,
      payload.userId,
      payload.matricule,
      payload.program,
      payload.faculty,
      payload.graduationYear
    ]
  );

  return result.insertId;
};

exports.findByUserId = async userId => {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM student_profiles
      WHERE user_id = ?
      LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};