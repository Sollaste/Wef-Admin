// Méthode pour ajouter des utilisateurs

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/loginApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Importation du modèle d'utilisateur
const User = require('../models/userM');

// Ajouter un utilisateur
const username = 'WefUser';
const password = 'd4fnie_zkjb547';

// Hachage du mot de passe
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        return;
    }

    const newUser = new User({
        username: username,
        password: hash
    });

    newUser.save()
        .then(() => {
            console.log('Utilisateur ajouté avec succès !');
            mongoose.connection.close();
        })
        .catch(err => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
            mongoose.connection.close();
        });
});
