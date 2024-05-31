const mongoose = require('mongoose');

// Définition du modèle d'utilisateur dans mongoDB
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

module.exports = User;