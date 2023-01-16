const socketio = require("socket.io")
const connections = []

let io;

exports.setupWebsocket = (server) => {
    io = socketio(server)
    io.on('connection', socket => {
        console.log(socket.id)
        const { latitude, longitude, techs } = socket.handshake.query;

    })
}