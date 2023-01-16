const Student = require("../models/Student")
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {
    async index(req, res) {
        const { techs, longitude, latitude } = req.query
        const techsArray = parseStringAsArray(techs)
        const maxDistance = 10000
        const students = await Student.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: maxDistance
                }
            }
        })
        return res.json({ students })
    }
}