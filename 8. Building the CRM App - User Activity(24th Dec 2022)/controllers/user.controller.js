/**
 * Controllers for the user resources.
 * Only the user of type ADMIN should be able to perform the operations
 * defined in the User Controller
 */
const User = require("../models/user.model")
const ObjectConverter = require("../utils/objectConverter")

const fetchAll = async (res) => {
    let users
    try {
        users = await User.find()
    } catch (err) {
        console.err('error while fetching the users')
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
    return users
}

const fetchByName = async (userNameReq, res) => {
    let users
    try {
        users = await User.find({
            userName: userNameReq
        });
    } catch (err) {
        console.err("error while fetching the user for userName : ", userNameReq);
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
    return users
}

const fetchByTypeAndStatus = async (userTypeReq, userStatusReq, res) => {
    let users
    try {
        users = await User.find({
            userType: userTypeReq,
            userStatus: userStatusReq
        });
    } catch (err) {
        console.err(`error while fetching the user for userType [${userTypeReq}] and userStatus [${userStatusReq}]`);
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
    return users
}

const fetchByType = async (userTypeReq, res) => {
    let users
    try {
        users = await User.find({
            userType: userTypeReq
        });
    } catch (err) {
        console.err(`error while fetching the user for userType [${userTypeReq}] `);
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
    return users
}

const fetchByStatus = async (userStatusReq, res) => {
    let users
    try {
        users = await User.find({
            userStatus: userStatusReq
        });
    } catch (err) {
        console.err(`error while fetching the user for userStatus [${userStatusReq}] `);
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
    return users
}
/**
 * Fetch the list of all users
 */
exports.findAll = async (req, res) => {
    let users
    let userTypeReq = req.query.userType
    let userStatusReq = req.query.userStatus
    let userNameReq = req.query.name

    if (userNameReq) {
        users = await fetchByName(userNameReq, res)
    } else if (userTypeReq && userStatusReq) {
        users = await fetchByTypeAndStatus(userTypeReq, userStatusReq, res)
    } else if (userTypeReq) {
        users = await fetchByType(userTypeReq, res)
    } else if (userStatusReq) {
        users = await fetchByStatus(userStatusReq, res)
    } else {
        users = await fetchAll(res)
    }
    res.status(200).send(ObjectConverter.userResponse(users))
}

exports.findById = async (req, res) => {

}

exports.update = async (req, res) => {

}
