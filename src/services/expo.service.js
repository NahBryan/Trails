const { Expo } = require("expo-server-sdk");

const expo = new Expo();

exports.send = async (token, title, body) => {
  const messages = [
    {
      to: token,
      sound: "default",
      title,
      body
    }
  ];

  await expo.sendPushNotificationsAsync(messages);
};