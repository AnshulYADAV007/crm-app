const User = require('../models/user.model')
const constants = require("../utils/constants")

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateUserRequestBody = async (req, res, next) => {
    /**
     * Steps
     * 1. Validate the name
     * 2. Validate the userId
     * 3. Validate the email
     * 4. Validate the userType
     */

    if (!req.body.name) {
        return res.status(400).send(
            "Failed! Name of the user not provided"
        )
    }

    if (!req.body.userId) {
        return res.status(400).send(
            "Failed! UserId not provided"
        )
    }

    try {
        let user = await User.findOne({
            userId: req.body.userId
        })
        if (user != null) {
            return res.status(400).send(
                "Failed! UserId already exist"
            )
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).send(
            "Internal Server Error!"
        )
    }

    if (!isValidEmail(req.body.email)) {
        return res.status(400).send(
            "Failed! Invalid Email address"
        )
    }

    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user != null) {
            return res.status(400).send(
                "Failed! Email is already taken"
            )
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).send(
            "Internal Server Error!"
        )
    }

    const userType = req.body.userType
    const userTypes = [
        constants.userTypes.admin,
        constants.userTypes.customer,
        constants.userTypes.client
    ]
    if (!userType || !userTypes.includes(userType)) {
        return res.status(400).send(
            "Failed! UserType provided is invalid. Possible values CUSTOMER | CLIENT | ADMIN"
        )
    }

    next()
}

const validateUserStatusAndUserType = async (req, res, next) => {
    //Validateing the user type
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.client, constants.userTypes.admin]
    if (userType && !userTypes.includes(userType)) {
        res.status(400).send({
            message: "UserType provided is invalid. Possible values CUSTOMER | CLIENT | ADMIN "
        });
        return;
    }
    //validting the userStatus
    const userStatus = req.body.userStatus;
    const userSatuses = [constants.userStatus.pending, constants.userStatus.approved, constants.userStatus.rejected]
    if (userStatus && !userSatuses.includes(userStatus)) {
        res.status(400).send({
            message: "UserStatus provided is invalid. Possible values PENDING | APPROVED | REJECTED "
        });
        return;
    }
    next();
}
const verifyUserRequestBody = {
    validateUserRequestBody: validateUserRequestBody,
    validateUserStatusAndUserType: validateUserStatusAndUserType

};
module.exports = verifyUserRequestBody

