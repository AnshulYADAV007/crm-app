const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require("./routes/auth.routes")(app)
require("./routes/companies.routes")(app)

app.listen(process.env.PORT, () => console.log("Listening at localhost:3500"))

module.exports = app