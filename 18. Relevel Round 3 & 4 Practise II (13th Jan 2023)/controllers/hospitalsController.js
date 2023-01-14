const db = require('../models');

// Defining methods for the hopitalController
module.exports = {
    findAll: function (req, res) {
        db.Hospital // -> Object
            .find(req.query) // -> db.Hospital.find() -> promise
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create(req, res) {
        db.Hospital
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Hospital
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log('the findbyid symptomJournal is not working in symptomscontroller.js error: ' + err));
        //res.status(422).json(err));
    },
    update: function (req, res) {
        db.Hospital
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log('the update symptomJournal is not working in symptomscontroller.js error: ' + err));
        //res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Hospital
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log('the remove symptomJournal is not working in symptomscontroller.js error: ' + err));
        //res.status(422).json(err));
    },
};
