const mongoose = require('mongoose');

// Définition du modèle de logs dans mongoDB
const logSchema = new mongoose.Schema({
    method : { type: String, required: true },
    fullUrl : { type: String, required: true },
    body : { type: String, required: true },
    ruleId : { type: String, required: true },
    action : { type: String, required: true },
    message : { type: String, required: true },
});

const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;