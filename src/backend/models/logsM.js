const mongoose = require('mongoose');

var log = mongoose.createConnection('mongodb://mongodb/logs')

// TODO expend log entry data
var Logs = log.model('Logs', new mongoose.Schema({
    level : { type: String, required: true },
    ts : { type: String, required: true },
    msg : { type: String, required: true },
}));

module.exports = Logs;
