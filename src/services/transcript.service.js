const { v4: uuidv4 } = require("uuid");

const db = require("../config/db");

exports.createRequest = async data => {
  const requestId = uuidv4();

  const requestCode = `TR-${Date.now()}`;

  await db.execute(
    `
    INSERT INTO transcript_requests (
      id,
      request_code,
      institution_id,
      student_id,
      purpose,
      delivery_method,
      amount
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [
      requestId,
      requestCode,
      data.institutionId,
      data.studentId,
      data.purpose,
      data.deliveryMethod,
      data.amount
    ]
  );

  return requestId;
};