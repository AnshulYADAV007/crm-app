const constants = require("../utils/constants");


validateMovieRequestBody = async (req, res, next) => {

    //Validate the movie name
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! Movie name is not provided !"
        });
    }

    //validate the movie status
    if (!req.body.releaseStatus) {
        return res.status(400).send({
            message: "Failed! Movie release status is not provided !"
        });
    }

    //Checking for the correct value of status
    const releaseStatus = req.body.releaseStatus;
    const releaseStatusTypes = [constants.releaseStatus.unrealeased, constants.releaseStatus.released, constants.releaseStatus.blocked];
    if (!releaseStatusTypes.includes(releaseStatus)) {
        return res.status(400).send({
            message: "Movie release status provided is invalid. Possible values UNRELEASED | RELEASED | BLOCKED "
        });

    }

    //validate the release date
    if (!req.body.releaseDate) {
        return res.status(400).send({
            message: "Failed! Movie release date is not provided !"
        });

    }

    //Validate the director
    if (!req.body.director) {
        return res.status(400).send({
            message: "Failed! Movie director is not provided !"
        });

    }

    next();
}

const verifyMovieReqBody = {
    validateMovieRequestBody: validateMovieRequestBody
};

module.exports = verifyMovieReqBody;