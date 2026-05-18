const admin = require("firebase-admin");

exports.sendPushNotification = async token => {
  return admin.messaging().send({
    token,
    notification: {
      title: "Trail",
      body: "Transcript ready"
    }
  });
};