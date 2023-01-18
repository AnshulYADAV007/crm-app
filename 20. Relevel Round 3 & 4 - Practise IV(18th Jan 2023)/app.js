const express = require("express")
const mongoose = require('mongoose')
const app = express()
require('./model/order')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/delivery_service",
    () => { console.log("Connected to Mongoose") })

require("./routes/order.routes")(app)

app.listen(7500, () => {
    console.log("Server now on port 7500")
})