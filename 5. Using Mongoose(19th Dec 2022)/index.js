const mongoose = require('mongoose')


// Run the following line to connect
mongoose.connect("mongodb://localhost:27017/twitter",
    () => { console.log("Connected To MongoDB") },
    err => { console.log("Error :", err.message) })

let engineSchema = mongoose.Schema({ horsePower: Number, cc: Number })

let carSchema = mongoose.Schema({
    brand: String,
    model: {
        type: String,
        validate: {
            validator: s => s.length > 5,
            message: props => `${props.value} model name is too short`
        }
    },
    engine: engineSchema
})

let cars = mongoose.model('Cars', carSchema)

cars.create({
    brand: "Maruti",
    model: "Altoss",
}).then(data => console.log(data))
    .catch(err => console.log(err))

let id = mongoose.Types.ObjectId("63a092b93c0de97a1da59c09")

let update = cars.updateOne({ _id: id },
    { brand: "Audi2", $inc: { __v: 1 } })

update.then(console.log)
    .catch(console.log)

const search = async function (id) {
    try {
        const myCar = await cars.findOne({ _id: id })

        console.log(myCar)
    } catch (err) {
        console.log(err)
    }
}

search(id).then(() => console.log("found!!"))