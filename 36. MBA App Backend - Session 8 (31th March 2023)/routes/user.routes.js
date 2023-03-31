const userController = require('../controllers/user.controller')
const authJwt = require('../middlewares/authjwt')
const { validateUserStatusAndUserType } = require('../middlewares/validateUserReqBody')

module.exports = function (app) {
    app.put('/mba/api/users', [authJwt.verifyToken], userController.update)
    app.put('/mba/api/users/:userId', [authJwt.verifyToken, authJwt.isAdmin, validateUserStatusAndUserType], userController.updateUser)
}