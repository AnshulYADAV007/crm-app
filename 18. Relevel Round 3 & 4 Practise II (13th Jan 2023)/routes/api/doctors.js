const doctorsController = require("../../controllers/doctorsController")
const router = require("express").Router()

// Matches with "/doctors"
router.route("/")
    .get(doctorsController.findAll)
    .post(doctorsController.create);

// Matches with "/doctors/:id"
router.route("/:id")
    .delete(doctorsController.remove)
    .get(doctorsController.findById)
    .put(doctorsController.update);
module.exports = router;