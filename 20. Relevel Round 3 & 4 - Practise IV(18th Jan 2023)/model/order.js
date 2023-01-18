const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    quantity: {
        type: Number,
        required: "Quantity is required",
        default: 1
    },
})

const AddressSchema = new Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    addressLine1: {
        type: String,
        required: "First Line of address is required"
    },
    addressLine2: {
        type: String
    },
    pinCode: {
        type: Number,
        required: "Pincode is required"
    },
    city: {
        type: String,
        required: "City is required"
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        enum: ["INDIA", "UKRAINE"],
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const OrderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
    },
    destination: {
        type: AddressSchema,
        // required: "Destination Address is Required"
    },
    source: {
        type: AddressSchema,
        // required: "Source Address is Required"
    },
    items: {
        type: [ItemSchema],
        required: "Items are required",
        default: []
    },
    status: {
        type: String,
        enum: ["PLACED", "INTRANSIT", "DELIVERED"],
        default: "PLACED"
    }
})

module.exports = mongoose.model('Order', OrderSchema)