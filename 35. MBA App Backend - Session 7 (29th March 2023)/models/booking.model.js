const mongoose = require("mongoose");


/**
 * Defines the schema of the movie resource to be stored in the DB
 */
const bookingSchema = new mongoose.Schema({

    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Theatre"
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Movie"

    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"

    },
    timing: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true,
        default: "IN_PROGRESS"
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
    },
    noOfSeats: {
        type: Number,
        required: true,
    },
    totalCost: {
        type: Number
    }
}, {
    //versionKey: false // this will remove the __v field, which indicates the internal revision of the document
})

module.exports = mongoose.model("Booking", bookingSchema);