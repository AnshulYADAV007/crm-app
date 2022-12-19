# Steps to use Mongoose

1. Install Mongoose
    cd ./5. Using Mongoose(19th Dec 2022)

    npm install mongoose --save

    npm init


2. Import Mongoose module
    Create an index.js file and add:
    const mongoose = require('mongoose')


3. Connect to MongoDB from program file.
    
    mongoose.connect("mongodb://localhost:27017",
        () => { console.log("Connected To MongoDB") },
        err => { console.log("Error :", err.message) })


4. Create Data Model
    1. new mongoose.schema()
    2. new mongoose.model()

    let cars = mongoose.model('Cars',
                mongoose.Schema({
                    brand: String,
                    model: String
                }))


5. Do CRUD operations on data model

    cars.create({ "brand": "Maruti", "model": "Swift" })
    .then(console.log)
    .catch(console.log)