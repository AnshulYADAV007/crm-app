const mongoose = require("mongoose");

/**
 * Defines the schema of the payment resource to be stored in the DB
 */
const paymentSchema = new mongoose.Schema({

    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Booking"
    },
    amount: {
        type: Number,
        required: true

    },
    status: {
        type: String,
        required: true,
        default: "FAILED"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
}, {
    //versionKey: false // this will remove the __v field, which indicates the internal revision of the document
})

module.exports = mongoose.model("Payment", paymentSchema);