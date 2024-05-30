const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/loginApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Configuration de body-parser
app.use(bodyParser.urlencoded({ extended: false })); // Permet à Express de traduire le json en objet

// Configuration de express-session
app.use(session({
    secret: 'rfqHIe9tGpJ2aNpdgnjTRROFlwjnYZ5dmMIY8TFTmVIlSSqpjWXd9B4r2HXwaFdOLGOiGHvy44yk32cDQPalmumg6vIBUiBRZzC6', // Cookie de chiffrement
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // En prod ce serait différent
}));

// Définition du modèle d'utilisateur
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const logSchema = new mongoose.Schema({
    method : { type: String, required: true },
    fullUrl : { type: String, required: true },
    body : { type: String, required: true },
    ruleId : { type: String, required: true },
    action : { type: String, required: true },
    message : { type: String, required: true },
})

// Route de la page d'accueil
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});

// Route de la page de connexion
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Gestion de la soumission du formulaire de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return res.status(500).send('Erreur interne');
        }

        if (!user) {
            return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send('Erreur interne');
            }

            if (result) {
                req.session.userId = user._id;
                return res.redirect('/dashboard');
            } else {
                res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
            }
        });
    });
});

// Route de la page du tableau de bord (dashboard)
app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Servir les fichiers statiques
app.use(express.static('public'));

// Simuler les logs
const logs = [
    { method : "Method", method : "Method", fullUrl : "URL", body : "Body", ruleId : "RuleID", action : "Action", message : "Message"}
];

// Endpoint pour récupérer les logs
app.get('/api/logs', (req, res) => {
    res.json(logs);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
