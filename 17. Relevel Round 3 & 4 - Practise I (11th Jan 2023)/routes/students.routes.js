const studentController = require("../controllers/students.controller")
const authorization = require("../middlewares/authorization")
module.exports = function (app) {
    app.get('/hiring/students/', authorization, studentController.findAll)
    app.get('/hiring/students/:id', authorization, studentController.findById)
    app.delete('/hiring/students/:id', authorization, studentController.delete)
}