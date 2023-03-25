const User = require('../models/user.model')
const constants = require('../utils/constants')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')

exports.signup = async function (req, res) {
    // Decide the status
    let userStatus = req.body.userStatus
    if (!userStatus) {
        // if customer, userStatus = approved
        // else pending
        if (!req.body.userType ||
            req.body.userType === constants.userTypes.customer)
            userStatus = constants.userStatus.approved
        else
            userStatus = constants.userStatus.pending
    }

    // Create a new user
    try {
        let user = await User.create({
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            userType: req.body.userType,
            userStatus: userStatus,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        let response = {
            name: user.name,
            id: user._id,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        }
        res.status(201).send(response)

    } catch (e) {
        console.log(e.message)
        res.status(500).send('Some internal server error while creating the user')
    }
}

exports.signin = async function (req, res) {
    /**
     * Steps
     * 1. Check the userId in the Collection
     * 2. Check the status of the user
     * 3. Check the password
     * 4. Send the JWT Token back
     *  */
    try {
        const user = await User.findOne({ userId: req.body.userId })
        if (user === null) {
            res.status(401).send("User with the given userId not found!!")
            return
        }

        if (user.userStatus !== constants.userStatus.approved) {
            res.status(403).send("User is not yet approved")
            return
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password,
            user.password)

        if (!isPasswordValid) {
            res.status(403).send("Invalid Password")
            return
        }

        const token = jwt.sign({ id: user.userId },
            authConfig.secret,
            { expiresIn: 120 })

        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userTypes: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).send("Internal Server Error")
    }
}
