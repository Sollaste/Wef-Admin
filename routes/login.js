const express = require('express');
const router = express.Router();

const path = require('path');

// Dépendance permettant le hashage des mdp
const bcrypt = require('bcrypt');

// Importation du modèle de la base de données User
const User = require('../models/userM');

// Route de la page de connexion
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views', 'login'));
});

// Gestion de la soumission du formulaire de connexion
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Stockage de l'ID de l'utilisateur dans la session
            req.session.userId = user._id;
            // Redirection vers le tableau de bord
            return res.redirect('/dashboard');
        } else {
            return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
        }
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        return res.status(500).send('Erreur interne');
    }
});

module.exports = router;