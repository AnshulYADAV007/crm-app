const Order = require("../model/order")

module.exports = {
    findAll: function (req, res) {
        Order.find(req.query)
            .then(orders => res.status(200).send(orders))
            .catch(error => res.status(422).send({
                message: "Internal server error"
            }))
    },
    create: function (req, res) {
        Order.create(req.body)
            .then(order => res.status(200).send(order))
            .catch(error => res.status(422).send({
                message: error
            }))
    },
    findById: function (req, res) {
        Order.findById(req.params.id)
            .then(order => res.status(200).send(order))
            .catch(err => res.status(422).send({
                "err": err
            }))
    },
    update: function (req, res) {
        Order.findByIdAndUpdate(req.params.id, req.body)
            .then(order => res.status(200).send(order))
            .catch(err => res.status(422).send({
                "err": err
            }))
    },
    remove: function (req, res) {
        Order.findByIdAndRemove(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(422).send({
                "err": err
            }))
    }
}