const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const server = http.Server(app)
const routes = require("./routes")
const { setupWebsocket } = require("./websocket")
setupWebsocket(server)
mongoose.connect("mongodb://localhost:27017/students-as-range",
    () => { console.log("Connected to Mongo") }
)
app.use(express.json())
app.use(routes)

server.listen(5500,
    () => console.log("Listening to localhost:5500"))