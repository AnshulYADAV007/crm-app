exports.userResponse = (users) => {
    let usersResult = []
    users.forEach(user => {
        usersResult.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        })
    });
    return usersResult
}