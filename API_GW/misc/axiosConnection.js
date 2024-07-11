const axios = require("axios");

// WE create multiple axios instances based on the destination service

const contentConnection = axios.create({
  baseURL: "http://" + process.env.CONTENT_SERVICE_HOST + ":3000",
  timeout: 5000,
});

const userConnection = axios.create({
  baseURL: "http://" + process.env.USER_SERVICE_HOST + ":3000",
  timeout: 5000,
});

const notificationConnection = axios.create({
  baseURL: "http://" + process.env.NOTIFICATION_SERVICE_HOST + ":3000",
  timeout: 5000,
});

const analyticsConnection = axios.create({
  baseURL: "http://" + process.env.ANALYTICS_SERVICE_HOST + ":3000",
  timeout: 5000,
});

module.exports = {
  contentConnection: contentConnection,
  userConnection,
  notificationConnection,
  analyticsConnection
};
