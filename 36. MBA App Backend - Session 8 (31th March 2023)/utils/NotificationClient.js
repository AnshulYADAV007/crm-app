const Client = require('node-rest-client').Client

const client = new Client();

exports.client = client;
exports.sendEmail = (ticketId, subject, content, emailIds, requester) => {
    let reqBody = {
        subject: subject,
        content: content,
        receipientEmails: emailIds,
        requester: requester,
        ticketId: ticketId
    }
    let args = {
        data: reqBody,
        headers: { "Content-Type": "application/json" }
    }

    client.post("http://localhost:3030/notifiServ/api/notifications",
        args, function (data, response) {
            console.log("Request sent");
            console.log(data);
        })
}