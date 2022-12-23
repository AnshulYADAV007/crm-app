const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")
const constants = require("../utils/constants")
const User = require("../models/user.model")

const verifyToken = (req, res, next) => {

    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, authConfig.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                })
            }
            req.body.userId = decoded.userId
            next()
        })

}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        userId: req.body.userId
    })

    if (user && user.userType == constants.userTypes.admin) {
        next();
    } else {
        res.status(403).send({
            message: "Require Admin Role!"
        })
        return;
    }
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}