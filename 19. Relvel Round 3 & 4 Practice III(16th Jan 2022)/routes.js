const { Router } = require('express')
const routes = Router()


routes.get('/', (req, res) => {
    console.log(req)
    res.status(200).send({ message: "Websocket worked" })
})

module.exports = routes