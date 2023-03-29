const constants = require("../utils/constants")
const ObjectId = require('mongoose').Types.ObjectId
const Theatre = require("../models/theatre.model")

validateBookingRequestBody = async (req, res, next) => {

    //Validate the theater id is passed
    if (!req.body.theatreId) {
        return res.status(400).send({
            message: "Failed! theatreId is not provided !"
        });

    }
    //Validate the theater id is valid
    if (!ObjectId.isValid(req.body.theatreId)) {
        return res.status(400).send({
            message: "Failed! theatreId is not valid format !"
        });

    }

    //Validte if the theatre exists


    //Validate the movie id is passed
    if (!req.body.movieId) {
        return res.status(400).send({
            message: "Failed! movieId is not provided !"
        });

    }
    //Validate the movie id is valid
    if (!ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send({
            message: "Failed! movieId is not valid format !"
        });

    }

    /**
     * Validate if the movide id is present inside the theatre
     */
    console.log(req.body.theatreId);
    const theatre = await Theatre.findOne({ _id: req.body.theatreId });

    if (theatre == null) {
        return res.status(400).send({
            message: "Failed! Theatre passed doesn't exist !"
        });
    }
    console.log(theatre);
    if (!theatre.movies.includes(req.body.movieId)) {
        return res.status(400).send({
            message: "Failed! movieId passed is not available inside the theatre !"
        });
    }

    /**
     * Validate if the timings is present
     */
    if (!req.body.timing) {
        return res.status(400).send({
            message: "Failed! timing is not provided !"
        });

    }

    /**
     * Validate if the no Of seats is provided
     */
    if (!req.body.noOfSeats) {
        return res.status(400).send({
            message: "Failed! number of seats is not provided !"
        });

    }



    next();

}

const verifyBookingReqBody = {
    validateBookingRequestBody: validateBookingRequestBody
};

module.exports = verifyBookingReqBody;