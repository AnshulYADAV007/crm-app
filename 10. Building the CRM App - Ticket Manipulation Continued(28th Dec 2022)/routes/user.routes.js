const authJwt = require("../middlewares/authjwt")
const userController = require("../controllers/user.controller")

module.exports = function (app) {
    app.get('/crm/api/users/',
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.findAll)
    app.get('/crm/api/users/:userId',
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.findById
    )
    app.put('/crm/api/users/:userId',
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.update
    )
}