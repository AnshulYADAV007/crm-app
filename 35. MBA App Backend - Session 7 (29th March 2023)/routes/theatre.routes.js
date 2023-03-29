const theatreController = require("../controllers/theatre.controller");
const { verifyToken, isAdmin } = require("../middlewares/authjwt");
const { validateTheatreRequestBody } = require("../middlewares/validateTheatreReqBody");

/**
 * Routes for the movie resource
 */

module.exports = function (app) {
    app.get("/mba/api/theatres", [verifyToken], theatreController.getAllTheatres);
    app.get("/mba/api/theatres/:id", [verifyToken], theatreController.getTheatre);
    app.post("/mba/api/theatres", [verifyToken, isAdmin, validateTheatreRequestBody], theatreController.createTheatre);
    app.put("/mba/api/theatres/:id", [verifyToken, isAdmin], theatreController.updateTheatre);
    app.delete("/mba/api/theatres/:id", [verifyToken, isAdmin], theatreController.deleteTheatre);
    app.put("/mba/api/theatres/:id/movies", [verifyToken, isAdmin], theatreController.putMoviesToATheater);
    app.get("/mba/api/theatres/:theatreId/movies/:movieId", [verifyToken], theatreController.checkMovieInsideATheatre)
}