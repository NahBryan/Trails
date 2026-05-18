const db = require("../config/db.js");

exports.retryPendingPayments = async () => {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM payments
      WHERE status = 'PENDING'
    `
  );

  for (const payment of rows) {
    console.log(`Retrying payment ${payment.id}`);
  }
};