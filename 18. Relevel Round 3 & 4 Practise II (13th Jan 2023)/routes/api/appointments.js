const appointmentsController = require("../../controllers/appointmentsController")
const router = require("express").Router()

// Matches with "/appointments"
router.route("/")
    .get(appointmentsController.findAll)
    .post(appointmentsController.create);

// Matches with "/appointments/:id"
router.route("/:id")
    .delete(appointmentsController.remove)
    .get(appointmentsController.findById)
    .put(appointmentsController.update);
module.exports = router;