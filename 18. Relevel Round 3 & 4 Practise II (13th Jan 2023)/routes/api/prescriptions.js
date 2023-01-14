const prescriptionsController = require("../../controllers/prescriptionsController")
const router = require("express").Router()

// Matches with "/prescriptions"
router.route("/")
    .get(prescriptionsController.findAll)
    .post(prescriptionsController.create);

// Matches with "/prescriptions/:id"
router.route("/:id")
    .delete(prescriptionsController.remove)
    .get(prescriptionsController.findById)
    .put(prescriptionsController.update);
module.exports = router;
