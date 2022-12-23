const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose")
const authController = require("./controllers/auth.controller")
const express = require('express')
const app = express()

mongoose.connect(dbConfig.DB_URL)
app.use(express.json())

const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"))
db.once("open", () => console.log("Connected to Mongo DB"))

let authRouter = require('./routes/auth.routes')
authRouter(app)

app.get("/", (req, res) => res.send("Hi"))

app.listen(3000, () => console.log("Listening at localhost:3000"))