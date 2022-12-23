const authController = require("../controllers/auth.controller")

module.exports = function (app) {
    app.post('/crm/api/auth/signup', authController.signup)
}