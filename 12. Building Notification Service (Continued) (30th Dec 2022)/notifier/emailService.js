const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    port: 576,
    host: "smtp.gmail.com",
    auth: {
        user: 'crm.notification.service.1992@gmail.com',
        pass: 'q6jqa6NY6'
    },
    secure: false
})