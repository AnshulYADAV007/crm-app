const Theatre = require('../models/theatre.model')

exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode

    }

    try {
        const theatre = await Theatre.create(theatreObject);
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
        const theatres = await Theatre.find(queryObj);
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
        var updatedTheatre = await savedTheatre.save();
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
        await Theatre.deleteOne({
            _id: req.params.id
        });
        res.status(200).send({
            message: "Successfully deleted theatre with id [ " + req.params.id + " ]"
        });
    } catch (e) {
        console.log(e.message)
    }
}
