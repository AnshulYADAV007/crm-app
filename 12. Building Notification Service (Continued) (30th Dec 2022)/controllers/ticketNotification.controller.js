const TicketNotificationModel = require("../models/ticketNotification.model")

/**
 * This controller adds a new unsent notification to our db
 */
exports.acceptNotificationRequest = async (req, res) => {
    const notificationObject = {
        subject: req.body.subject,
        content: req.body.content,
        receipientEmails: req.body.receipientEmails,
        requester: req.body.requester,
        ticketId: req.body.ticketId,
    }

    try {
        const notification = await TicketNotificationModel.create(
            notificationObject
        )
        res.status(200).send({
            requestId: notification.ticketId,
            status: "Accepted Request"
        })
    } catch (err) {
        console.log(`Error while accepting a notification request: ${err.message}`)
        res.status(500).send({
            message: "Internal Server Error!"
        })
    }
}


/**
 * This controller tells the client the current status of a
 * notification.
 */
exports.getNotificationStatus = async (req, res) => {

    const reqId = req.params.id

    try {
        const notification = await TicketNotificationModel.findOne({
            ticketId: reqId
        })

        res.status(200).send({
            requestId: notification.ticketId,
            subject: notification.subject,
            content: notification.content,
            receipientEmails: notification.receipientEmails,
            sentStatus: notification.sentStatus
        })
    } catch (err) {
        console.log(`Error while fetching a notification request: ${err.message}`)
        res.status(500).send({
            message: "Internal Server Error!"
        })
    }
}