const hospitalController = require("../../controllers/hospitalsController")
const router = require("express").Router()

// Matches with "/hospital"
router.route("/")
    .get(hospitalController.findAll)
    .post(hospitalController.create);

// Matches with "/hospital/:id"
router.route("/:id")
    .delete(hospitalController.remove)
    .get(hospitalController.findById)
    .put(hospitalController.update);
module.exports = router;