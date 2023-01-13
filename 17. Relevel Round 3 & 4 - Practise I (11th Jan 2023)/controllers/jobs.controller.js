const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Job = require("../models/Job")

const { ADMIN, COMPANY, STUDENT } = require('../constants/roles');

exports.getAll = (req, res) => {
    const { _id, role } = req.user;

    if (role === COMPANY)
        return Job.find({ _companyId: _id })
            .then(jobs => res.status(200).send(jobs))
            .catch(error => res.status(400).send({ message: error.message }));

    Job.find({})
        .then(jobs => res.status(200).send(jobs))
        .catch(error => res.status(400).send({ message: error.message }));
}

exports.getById = (req, res) => {
    const { _id, role } = req.user;

    if (role === COMPANY)
        return Job.find({ _id: req.params.id, _companyId: _id })
            .then(job => res.status(200).send(job))
            .catch(error => res.status(400).send({ message: error.message }));

    Job.findById(req.params.id)
        .then(job => res.status(200).send(job))
        .catch(error => res.status(400).send({ message: error.message }));
}

exports.create = (req, res) => {
    const { _id, role } = req.user;
    const { title, description } = req.body;

    if (role !== COMPANY)
        return res.status(401).send({ message: 'Access denied.' });

    const job = new Job({
        _companyId: _id,
        title,
        description
    });

    job
        .save()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send({ message: error.message }));
}

exports.addApplicant = (req, res) => {
    const { _id, role } = req.user;

    if (role !== STUDENT)
        return res.status(401).send({ message: 'Access denied.' });

    console.log(req.params.id)

    Job.findById(req.params.id)
        .then(job => {
            console.log(job)
            job.applicants.push(_id)
            return job.save()
        })
        .then(success => res.status(200).send("The student got added!"))
        .catch(error => res.status(400).send({ message: error.message }));
}

exports.delete = (req, res) => {
    const { _id, role } = req.user;

    if (role === STUDENT)
        return res.status(401).send({ message: 'Access denied.' });

    if (role === COMPANY)
        return Job.deleteOne({ _id: req.params.id, _companyId: _id })
            .then(success => res.status(200).send(success.deletedCount.toString()))
            .catch(error => res.status(400).send({ message: error.message }));

    Job.deleteOne({ _id: req.params.id })
        .then(success => res.status(200).send(success.deletedCount.toString()))
        .catch(error => res.status(400).send({ message: error.message }));
}