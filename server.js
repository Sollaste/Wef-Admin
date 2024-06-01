const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();

// Ajout du coeur ejs
app.set('view engine', 'ejs');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/loginApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB - LoginApp réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB - LoginAPP :', err));

// Configuration de body-parser
app.use(bodyParser.urlencoded({ extended: true })); // Permet à Express de traduire le json en objet
app.use(bodyParser.json());

// Configuration de express-session
app.use(session({
    secret: 'rfqHIe9tGpJ2aNpdgnjTRROFlwjnYZ5dmMIY8TFTmVIlSSqpjWXd9B4r2HXwaFdOLGOiGHvy44yk32cDQPalmumg6vIBUiBRZzC6', // Cookie de chiffrement
    resave: false,
    saveUninitialized: true,
}));

// =================== ROUTE & VUES ===================

// Servir les fichiers statiques
app.use(express.static('public'));

// Importation des routeurs
const loginRouter = require('./routes/login');
const logsRouter = require('./routes/dashboard');
const logRouter = require('./routes/log');

// Usage des routeurs
app.use('/login', loginRouter);
app.use('/dashboard', logsRouter);

// Route de l'API REST (Récupérateur et poster de logs)
app.use('/api', logRouter);

// Route de la page d'accueil
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});

// =================== FIN DES ROUTES & VUES ===================

// Simuler les logs
const logs = [
    { method : "Method", fullUrl : "URL", body : "Body", ruleId : "RuleID", action : "Action", message : "Message"}
];

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
