const Student = require("../models/Student")
const { ADMIN, COMPANY, STUDENT } = require("../constants/roles")

exports.findAll = (req, res) => {
    if (req.user.role === STUDENT)
        return res.status(401).send({ message: "Access Denied" })

    Student.find({})
        .then(students => res.status(200).send(students))
        .catch(error => res.status(400)
            .send({ message: "Internal Server Error!" }))
}

exports.findById = (req, res) => {
    if (req.user.role === STUDENT)
        return res.status(401).send({ message: "Access Denied" })

    Student.findById(req.params.id)
        .then(student => res.status(200).send(student))
        .catch(error => res.status(400)
            .send({ message: "Internal Server Error!" }))
}

exports.delete = (req, res) => {
    if (req.user.role !== ADMIN)
        return res.status(401).send({ message: 'Access denied.' });

    Student.deleteOne({ _id: req.params.id })
        .then(success => res.status(200)
            .send(success.deletedCount.toString()))
        .catch(error => res.status(400)
            .send({ message: "Internal Server Error!" }));
}