const mongoose = require('mongoose')


// Run the following line to connect
mongoose.connect("mongodb://localhost:27017/twitter",
    () => { console.log("Connected To MongoDB") },
    err => { console.log("Error :", err.message) })

let cars = mongoose.model('Cars',
    mongoose.Schema({
        brand: String,
        model: String
    }))

cars.create({ "brand": "Maruti", "model": "Swift" })
    .then(data => console.log("Success"))
    .catch(err => console.log("Error"))

let id = mongoose.Types.ObjectId("63a092b93c0de97a1da59c09")

cars.updateOne({ _id: id },
    { brand: "Audi2" })
    .then(console.log)
    .catch(console.log)

