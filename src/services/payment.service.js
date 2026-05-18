const axios = require("axios");

exports.initializeMtnPayment = async payload => {
  const response = await axios.post(
    "https://sandbox.mtn.com/payment",
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.MTN_API_KEY}`
      }
    }
  );

  return response.data;
};

exports.initializeOrangePayment = async payload => {
  const response = await axios.post(
    "https://sandbox.orange.com/payment",
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.ORANGE_API_KEY}`
      }
    }
  );

  return response.data;
};