const authController = require("../controllers/auth.controller")

exports = function (app) {
    app.post('/hiring/auth/signup', authController.signUp)
    app.post('/hiring/auth/signin', authController.signIn)
}