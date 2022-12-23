const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose")
const authController = require("./controllers/auth.controller")
const express = require('express')
const User = require("./models/user.model")
const app = express()
const bcrypt = require('bcryptjs')
const constants = require("./utils/constants")
async function init() {
    let user = await User.findOne({ userId: "admin" })

    if (user) {
        console.log("Admin user already present", user)
        return
    }

    try {
        let user = await User.create({
            name: "Anshul",
            userId: "admin",
            email: "admin@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1", 8),
            userStatus: constants.userStatus.approved
        })
        console.log(user)
    } catch (err) {
        console.log(err.message)
    }
}

mongoose.connect(dbConfig.DB_URL)
app.use(express.json())

const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"))
db.once("open", () => {
    console.log("Connected to Mongo DB")
    init()
})

let authRouter = require('./routes/auth.routes')
authRouter(app)

let userRouter = require("./routes/user.routes")
userRouter(app)

app.get("/", (req, res) => res.send("Hi"))

app.listen(3000, () => console.log("Listening at localhost:3000"))