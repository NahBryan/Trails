const notificationService = require("../services/notification.service.js");

exports.dispatch = async payload => {
  await notificationService.sendPushNotification(payload.token);
};