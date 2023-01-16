const Student = require("../models/Student")
const websocket = require("../websocket")
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {
    async index(req, res) {
        let students = await Student.find()
        return res.json(students)
    },

    async store(req, res) {
        const { github_username, techs, longitude, latitude }
            = req.body
        let student = await Student.findOne({ github_username })
        if (!student) {
            const techsArray = parseStringAsArray(techs)
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            student = await Student.create({
                github_username,
                techs: techsArray,
                location
            })
            const sendTo = websocket.findConnections(
                { latitude, longitude }, techsArray
            )
            if (sendTo.length > 0) {
                websocket.sendMessage(sendTo, 'new-student', student)
            }
            res.status(200).send({ message: "Student Added" })
        }
    },
    async update(req, res) {
        const { github_username, techs, longitude, latitude }
            = req.body
        let student = await Student.findOne({ github_username })
        if (student) {
            const techsArray = parseStringAsArray(techs)
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            student.techs = techsArray
            student.location = location
            await student.save()
        }
        return res.json(student)
    },
    async destroy(req, res) {
        const { github_username } = req.body
        await Student.findOneAndDelete({ github_username })
        return res.json({ status: "The student was deleted" })
    }
}