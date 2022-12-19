const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017", () => {
    console.log("Connected To MongoDB")
}, err => { console.log("Error :", err.message) })

