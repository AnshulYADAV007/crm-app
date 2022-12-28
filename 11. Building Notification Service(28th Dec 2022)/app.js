const cron = require("node-cron")

cron.schedule('*/5 * * * * *', () => console.log("Please take care of your eyes!"))

// second, minute, hour, day of month, month, day of week