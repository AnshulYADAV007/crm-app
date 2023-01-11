const authController = require("../controllers/auth.controller")

module.exports = function (app) {
    app.post('/hiring/auth/signup/:role', authController.signUp)
    app.post('/hiring/auth/signin/:role', authController.signIn)
}