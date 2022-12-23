const User = require("../models/user.model")
const { userTypes } = require("../utils/constants")
const constants = require("../utils/constants")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/auth.config")


exports.signup = async (req, res) => {
    let userStatus

    if (req.body.userType == userTypes.engineer ||
        req.body.userType == userTypes.admin) {
        userStatus = constants.userStatus.pending
    } else {
        userStatus = constants.userStatus.approved
    }

    console.log(req)
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

    try {
        const userCreated = await User.create(userObj)
        const postReponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
        res.status(201).send(postReponse)
    } catch (err) {
        console.log("Something went wrong while saving to DB", err.message)
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }
}

// exports.signin = async (req, res) => {

// }
