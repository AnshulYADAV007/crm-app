const movieController = require('../controllers/movie.controller')
const { verifyMovieReqBody } = require('../middlewares')

/**
 * Routes for the movie resource
 */
module.exports = function (app) {
    app.get('/mba/api/movies', movieController.getAllMovies)
    app.get('/mba/api/movies/:id', movieController.getMovie)
    app.post('/mba/api/movies',
        [verifyMovieReqBody.validateMovieRequestBody],
        movieController.createMovie)
    app.put("/mba/api/movies/:id",
        [verifyMovieReqBody.validateMovieRequestBody],
        movieController.updateMovie);
    app.delete("/mba/api/movies/:id",
        movieController.deleteMovie);
}