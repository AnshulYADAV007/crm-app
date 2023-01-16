const { Router } = require('express')
const searchController = require('./controllers/search.controller')
const studentsController = require('./controllers/students.controller')
const routes = Router()


routes.get('/', (req, res) => {
    console.log(req)
    res.status(200).send({ message: "Websocket worked" })
})
routes.post('/students', studentsController.store)
routes.get('/students', studentsController.index)
routes.put('/students', studentsController.update)
routes.delete('/students', studentsController.destroy)
routes.get('/search', searchController.index)

module.exports = routes