const mongoose = require('mongoose');

var log = mongoose.createConnection('mongodb://localhost/logs')

// Définition du modèle de logs dans mongoDB
var Logs = log.model('Logs', new mongoose.Schema({
    method : { type: String, required: true },
    fullUrl : { type: String, required: true },
    body : { type: String, required: true },
    ruleId : { type: String, required: true },
    action : { type: String, required: true },
    message : { type: String, required: true },
}));

module.exports = Logs;