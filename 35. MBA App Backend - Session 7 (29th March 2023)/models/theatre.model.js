const mongoose = require("mongoose");


/**
 * Defines the schema of the theatre resource to be stored in the DB
 */
const theatreSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    createdAt: {
        // I want to default to a new date
        type: Date,
        immutable: true,  // This will ensure the createdAt column is never updated but once in the start
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
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movie"
    }
}, {
    //versionKey: false // this will remove the __v field, which indicates the internal revision of the document
})

module.exports = mongoose.model("Theatre", theatreSchema);