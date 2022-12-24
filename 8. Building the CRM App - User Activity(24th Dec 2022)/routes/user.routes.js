const authJwt = require("../middlewares/authjwt")

module.exports = function (app) {
    app.get('/crm/api/users/', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => res.send(req.body))
    //  jwt token  -> userId -> response
}