const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Ajout du coeur ejs
app.set('view engine', 'ejs');

// Configuration de body-parser
app.use(bodyParser.urlencoded({ extended: true })); // Permet à Express de traduire le json en objet
app.use(bodyParser.json());

// Configuration de express-session
app.use(session({
    secret: 'rfqHIe9tGpJ2aNpdgnjTRROFlwjnYZ5dmMIY8TFTmVIlSSqpjWXd9B4r2HXwaFdOLGOiGHvy44yk32cDQPalmumg6vIBUiBRZzC6', // Cookie de chiffrement
    resave: false,
    saveUninitialized: true
}));

// Définir l'en-tête X-Content-Type-Options: nosniff
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// =================== ROUTE ===================

// Servir les fichiers statiques
app.use(express.static('public'));

// Importation des routeurs
const loginRouter = require('./routes/login');
const logsRouter = require('./routes/dashboard');
const logRouter = require('./routes/log');

// Usage des routeurs
app.use('/login', loginRouter);
app.use('/dashboard', logsRouter);

// Route de l'API REST (logs)
app.use('/api', logRouter);

// Route de la page d'accueil
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});

// =================== FIN DES ROUTES ===================

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
