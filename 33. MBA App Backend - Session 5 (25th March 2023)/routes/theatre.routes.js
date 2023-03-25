const theatreController = require("../controllers/theatre.controller");
const { validateTheatreRequestBody } = require("../middlewares/validateTheatreReqBody");

/**
 * Routes for the movie resource
 */

module.exports = function (app) {
    app.get("/mba/api/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/theatres/:id", theatreController.getTheatre);
    app.post("/mba/api/theatres", [validateTheatreRequestBody], theatreController.createTheatre);
    app.put("/mba/api/theatres/:id", theatreController.updateTheatre);
    app.delete("/mba/api/theatres/:id", theatreController.deleteTheatre);
    app.put("/mba/api/theatres/:id/movies", theatreController.putMoviesToATheater);
    app.get("/mba/api/theatres/:theatreId/movies/:movieId", theatreController.checkMovieInsideATheatre)
}