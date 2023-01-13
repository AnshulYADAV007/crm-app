const jobsController = require("../controllers/jobs.controller")
const authorization = require("../middlewares/authorization")

module.exports = (app) => {
    app.get("/hiring/jobs/", authorization, jobsController.getAll)
    app.post("/hiring/jobs/", authorization, jobsController.create)
    app.get("/hiring/jobs/:id", authorization, jobsController.getById)
    app.patch("/hiring/jobs/:id/apply", authorization, jobsController.addApplicant)
    app.delete("/hiring/jobs/:id", authorization, jobsController.delete)
}