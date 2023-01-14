const doctorsController = require("../../controllers/doctorsController")
const router = require("express").Router()

// Matches with "/api/doctors"
router.route("/")
    .get(doctorsController.findAll)
    .post(doctorsController.create);

// Matches with "/api/doctors/:id"
router.route("/:id")
    .delete(doctorsController.remove)
    .get(doctorsController.findById)
    .put(doctorsController.update);
module.exports = router;