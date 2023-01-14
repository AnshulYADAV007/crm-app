const router = require('express').Router()

router.use((req, res, next) => next())
router.use('/logs', require("./logs"))
router.use('/symptoms', require("./symptoms"))
router.use('/prescriptions', require("./prescriptions"))
router.use('/doctors', require("./doctors"))
router.use('/appointments', require("./appointments"))
router.use('/hospitals', require("./hospitals"))

module.exports = router