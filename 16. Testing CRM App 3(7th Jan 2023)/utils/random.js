const User = require("../models/user.model")
const random = async () => {
    let users = "ABC"
    try {
        users = await Promise.resolve(users)
        return users
    } catch (err) {
        return err
    }
}

random().then(console.log)