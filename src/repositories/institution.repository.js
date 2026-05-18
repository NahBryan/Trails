const db = require("../config/db.js");

exports.create = async payload => {
  const [result] = await db.execute(
    `
      INSERT INTO institutions (
        name,
        code,
        email,
        phone,
        address,
        logo
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      payload.name,
      payload.code,
      payload.email,
      payload.phone,
      payload.address,
      payload.logo
    ]
  );

  return result.insertId;
};

exports.findById = async id => {
  const [rows] = await db.execute(
    `SELECT * FROM institutions WHERE id = ? LIMIT 1`,
    [id]
  );

  return rows[0];
};

exports.updateStatus = async (id, status) => {
  await db.execute(
    `UPDATE institutions SET status = ? WHERE id = ?`,
    [status, id]
  );
};