const mongoose = require("mongoose");

/**
 * Defines the schema of the movie resource to be stored in the DB
 */
const movieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: "Hindi"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        enum: ["RELEASED", "UNRELEASED", "BLOCKED"],
        default: "RELEASED",
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




module.exports = mongoose.model("Movie", movieSchema);