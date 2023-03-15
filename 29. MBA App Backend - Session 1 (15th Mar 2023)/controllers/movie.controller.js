const Movie = require('../models/movie.model')

exports.getAllMovies = async (req, res) => {
    const queryObj = {}

    if (req.query.name != undefined) {
        queryObj.name = req.query.name
    }

    try {
        const movies = await Movie.find(queryObj)
        res.status(200).send(movies)
    } catch (e) {
        console.log(e.message)
    }
}

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id
        })
        res.status(200).send(movie)
    } catch (e) {
        console.log(e.message)
    }
}