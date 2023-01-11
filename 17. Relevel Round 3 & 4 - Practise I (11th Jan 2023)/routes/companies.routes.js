const companiesController = require("../controllers/companies.controller")
const authorization = require("../middlewares/authorization")
module.exports = function (app) {
    app.get('/hiring/companies/', authorization, companiesController.findAll)
    app.get('/hiring/companies/:id', authorization, companiesController.findById)
    app.delete('/hiring/companies/:id', authorization, companiesController.delete)
}