const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userM');

// Route de la page de connexion
router.get('/', (_, res) => {
    res.render('login');
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
            console.log('Utilisateur connecté :', user._id);
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