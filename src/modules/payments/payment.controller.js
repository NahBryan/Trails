const db = require("../../config/db.js");
const paymentService = require("../../services/payment.service.js");

exports.initialize = async (req, res, next) => {
  try {
    const {
      requestId,
      provider,
      phone,
      amount
    } = req.body;

    let response;

    if (provider === "MTN") {
      response = await paymentService.initializeMtnPayment({
        phone,
        amount
      });
    } else {
      response = await paymentService.initializeOrangePayment({
        phone,
        amount
      });
    }

    await db.execute(
      `
        INSERT INTO payments (
          institution_id,
          request_id,
          provider,
          transaction_ref,
          amount,
          currency,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        req.user.institutionId,
        requestId,
        provider,
        response.reference,
        amount,
        "XAF",
        "PENDING"
      ]
    );

    return res.json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

exports.webhook = async (req, res, next) => {
  try {
    const {
      transactionRef,
      status
    } = req.body;

    await db.execute(
      `
        UPDATE payments
        SET status = ?,
        paid_at = NOW()
        WHERE transaction_ref = ?
      `,
      [status, transactionRef]
    );

    return res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};