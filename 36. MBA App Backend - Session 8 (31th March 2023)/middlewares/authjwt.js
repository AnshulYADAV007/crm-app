const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
const theatreModel = require('../models/theatre.model')
const User = require('../models/user.model')
const constants = require('../utils/constants')

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send(
            "Token not provided"
        )
    }

    jwt.verify(token, authConfig.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send(
                    "Unauthorized!"
                )
            }
            req.userId = decoded.id
            next()
        })

}

// API endpoint -> varifyToken -> isAdmin -> controller

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        })

        if (user &&
            user.userType === constants.userTypes.admin)
            next()
        else {
            res.status(403).send({
                message: "Admin Role Required!"
            })
            return
        }
    } catch (e) {
        console.log(e.message)
        res.status(500).send("Internal Server Error!")
    }
}

const isAdminOrClient = async (req, res, next) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        })
        if (user && ((user.userType == constants.userTypes.admin) || (user.userType == constants.userTypes.client))) {
            if (user.userType == constants.userTypes.client) {
                const theatre = await theatreModel.findOne({ _id: req.params.id })

                if (String(theatre.ownerId != String(user._id))) {
                    return res.status(403).send({
                        message: "Client requesting to update the theatre is not the owner!"
                    })
                } else {
                    next();
                }
            } else {
                next()
            }
        } else {
            return res.status(403).send({
                message: "Require Admin Role or Client Role!"
            })
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).send("Internal Server Error!")
    }
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAdminOrClient: isAdminOrClient
};

module.exports = authJwt;