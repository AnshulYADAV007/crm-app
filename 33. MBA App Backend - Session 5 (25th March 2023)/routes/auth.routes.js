const authController = require('../controllers/auth.controller')

module.exports = function (app) {
    app.post('/mba/api/auth/signup', authController.signup)
    app.post('/mba/api/auth/signin', authController.signin)
}