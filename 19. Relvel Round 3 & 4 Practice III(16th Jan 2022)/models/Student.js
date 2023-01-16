const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const StudentSchema = new mongoose.Schema({
    github_username: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model("Student", StudentSchema)