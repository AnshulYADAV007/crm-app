const notificationController = require("../controllers/ticketNotification.controller")

module.exports = function (app) {
    app.post("/notifiServ/api/notifications/", notificationController.acceptNotificationRequest)
}