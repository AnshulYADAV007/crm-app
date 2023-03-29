const verifyMovieReqBody = require("./verifyMovieReqBody");
const verifyTheatreReqBody = require("./validateTheatreReqBody");
const authJwt = require("./authjwt");
const verifyUserReqBody = require("./validateUserReqBody");
const verifyBookingReqBody = require("./verifyBookingReqBody");

module.exports = {
    verifyMovieReqBody,
    authJwt,
    verifyTheatreReqBody,
    verifyUserReqBody,
    verifyBookingReqBody
}