const mongoose = require('mongoose');

var user = mongoose.createConnection('mongodb://localhost/loginApp')

// Définition du modèle d'utilisateur dans mongoDB
var User = user.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));


module.exports = User;