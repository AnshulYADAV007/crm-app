const theatreController = require("../controllers/theatre.controller");

/**
 * Routes for the movie resource
 */

module.exports = function (app) {
    app.get("/mba/api/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/theatres/:id", theatreController.getTheatre);
    app.post("/mba/api/theatres", theatreController.createTheatre);
    app.put("/mba/api/theatres/:id", theatreController.updateTheatre);
    app.delete("/mba/api/theatres/:id", theatreController.deleteTheatre);
}