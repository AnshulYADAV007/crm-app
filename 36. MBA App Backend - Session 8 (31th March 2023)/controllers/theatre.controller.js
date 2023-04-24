const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model');
const userModel = require('../models/user.model');
const { sendEmail } = require('../utils/NotificationClient');
const constants = require('../utils/constants');
const ObjectId = require('mongoose').Types.ObjectId

exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode,
        ownerId: req.body.ownerId
    }

    try {
        const theatre = await Theatre.create(theatreObject);
        const owner = await userModel.findOne({ _id: theatre.ownerId })
        sendEmail(theatre._id, "New theatre created with the theatre id: " + theatre._id,
            JSON.stringify(theatre), owner.email, "mba-no-reply@mba.com")
        res.status(201).send(theatre);
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Get the list of all the theaters
 */
exports.getAllTheatres = async (req, res) => {
    const queryObj = {};

    if (req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    if (req.query.city != undefined) {
        queryObj.city = req.query.city;
    }
    if (req.query.pinCode != undefined) {
        queryObj.pinCode = req.query.pinCode;
    }

    try {
        console.log(req.userId)
        let user = await userModel.findOne({ userId: req.userId })
        if (user.userType === constants.userTypes.client) {
            queryObj.ownerId = user._id
        }
        console.log(queryObj, user._id)
        let theatres = await Theatre.find(queryObj);
        if (req.query.movieId != undefined) {
            theatres = theatres.filter(
                t => t.movies.includes(req.query.movieId)
            )
        }
        res.status(200).send(theatres);
    } catch (e) {
        console.log("Get all failed beacuase: ", e.message)
    }
}

/**
 * Get the theatre based on theatre id
 */
exports.getTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });
        res.status(200).send(theatre);
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Update a theatre
 */
exports.updateTheatre = async (req, res) => {

    const savedTheatre = await Theatre.findOne({ _id: req.params.id });

    if (!savedTheatre) {
        return res.status(400).send({
            message: "Theatre being updated doesn't exist"
        });
    }

    savedTheatre.name = req.body.name != undefined
        ? req.body.name // True -> req.body.name is not undefined
        : savedTheatre.name; // else
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode;

    try {
        const updatedTheatre = await savedTheatre.save();
        console.log(updatedTheatre)
        const owner = await userModel.findOne({ _id: updatedTheatre.ownerId })
        sendEmail(
            updatedTheatre._id,
            "Updated theatre with the theatre id: " + updatedTheatre._id,
            JSON.stringify(updatedTheatre),
            owner.email,
            "mba-no-reply@mba.com"
        )
        res.status(200).send(updatedTheatre);
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Delete a theatres
 */
exports.deleteTheatre = async (req, res) => {
    try {
        const savedTheatre = await Theatre.findOne({
            _id: req.params.id
        })
        await Theatre.deleteOne({
            _id: req.params.id
        });
        const owner = await userModel.findOne({
            _id: savedTheatre.ownerId
        })

        sendEmail(
            savedTheatre._id,
            "Theatre deleted with the theatre id: " + savedTheatre._id,
            "Theatre Deleted",
            owner.email,
            "mba-no-reply@mba.com"
        )

        res.status(200).send({
            message: "Successfully deleted theatre with id [ " + req.params.id + " ]"
        });
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Add or remove movie inside a theatre
 */
exports.putMoviesToATheater = async (req, res) => {
    let savedTheatre = await Theatre.findOne({
        _id: req.params.id
    })

    const movieIds = req.body.movieIds;

    if (req.body.insert) {
        movieIds.forEach(movieId => {
            savedTheatre.movies.push(movieId)
            // To solve for duplicates use Set for movies
        });
    } else { // Remove movieIds from SavedTheatre
        let savedMovieIds = savedTheatre.movies

        movieIds.forEach(movieId => {
            // Delete movieId from savedMovieIds
            savedMovieIds = savedMovieIds.filter(
                element => element != movieId
            )
        })

        savedTheatre.movies = savedMovieIds
    }

    try {
        const updatedTheatre = await savedTheatre.save();
        const owner = await userModel.findOne({
            _id: savedTheatre.ownerId
        })
        sendEmail(
            savedTheatre._id,
            "Movies updated in the theatre with id: " + savedTheatre._id,
            JSON.stringify(updatedTheatre),
            owner.email,
            "mba-no-reply@mba.com"
        )

        res.status(200).send(updatedTheatre);
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Check if the given movie is running in the given theatre
 */
exports.checkMovieInsideATheatre = async (req, res) => {
    const savedTheatre = await Theatre.findOne({ _id: req.params.theatreId })
    const savedMovie = await Movie.findOne({ _id: req.params.movieId })

    try {
        const responseBody = {
            message: savedTheatre.movies.includes(savedMovie._id)
                ? "Movie is present"
                : "Movie is not present"
        }
        res.status(200).send(responseBody)
    } catch (e) {
        console.log(e.message)
    }
}