const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    service: "gmail",
    debug: true,
    auth: {
        user: 'anshulyadav98@gmail.com',
        pass: 'amjvdhrrjrhikugd'
    }
})