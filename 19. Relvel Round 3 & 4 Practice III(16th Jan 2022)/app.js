const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const routes = require("./routes")
const { setupWebsocket } = require("./websocket")
setupWebsocket(server)
app.use(express.json())
app.use(routes)

server.listen(5500,
    () => console.log("Listening to localhost:5500"))