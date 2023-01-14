const router = require('express').Router()

router.use((req, res, next) => next())
router.use('/logs', require("./logs"))
router.use('/symptoms', require("./symptoms"))
router.use('/prescriptions', require("./prescriptions"))

module.exports = router