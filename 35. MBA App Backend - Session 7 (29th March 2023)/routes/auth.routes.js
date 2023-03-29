const authController = require('../controllers/auth.controller')
const { validateUserRequestBody } = require('../middlewares/validateUserReqBody')

module.exports = function (app) {
    app.post('/mba/api/auth/signup', [validateUserRequestBody], authController.signup)
    app.post('/mba/api/auth/signin', authController.signin)
}