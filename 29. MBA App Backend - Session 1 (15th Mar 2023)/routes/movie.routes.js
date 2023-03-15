const movieController = require('../controllers/movie.controller')

/**
 * Routes for the movie resource
 */
module.exports = function (app) {
    app.get('/mba/api/movies', movieController.getAllMovies)
    app.get('/mba/api/movies/:id', movieController.getMovie)
}