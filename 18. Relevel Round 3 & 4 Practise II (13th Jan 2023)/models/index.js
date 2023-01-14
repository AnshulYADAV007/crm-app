// Exporting an object containing all of our models

module.exports = {
    User: require('./User'),
    Hospital: require('./hospital'),
    Doctor: require('./doctor'),
    HealthLog: require('./healthlog'),
    Appointment: require('./appointment'),
    SymptomJournal: require('./symptom'),
    Prescription: require('./prescription'),
    //Code: require('./Code'),
    //Token: require('./token'),
    //Client: require('./Client'),
};
