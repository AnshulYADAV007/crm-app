const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
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

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin

};

module.exports = authJwt;