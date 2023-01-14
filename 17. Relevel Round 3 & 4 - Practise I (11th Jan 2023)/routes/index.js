module.exports = (app) => {
    require("./auth.routes")(app)
    require("./companies.routes")(app)
    require("./jobs.routes")(app)
    require("./profile.routes")(app)
    require("./students.routes")(app)
}