const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const loginRouter = require('./routes/login');
const logsRouter = require('./routes/dashboard');

const app = express();
app.set('view engine', 'ejs');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/loginApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB - LoginApp réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB - LoginAPP :', err));

// Configuration de body-parser
app.use(bodyParser.urlencoded({ extended: false })); // Permet à Express de traduire le json en objet

// Configuration de express-session
app.use(session({
    secret: 'rfqHIe9tGpJ2aNpdgnjTRROFlwjnYZ5dmMIY8TFTmVIlSSqpjWXd9B4r2HXwaFdOLGOiGHvy44yk32cDQPalmumg6vIBUiBRZzC6', // Cookie de chiffrement
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // En prod ce serait différent
}));

// Jointure des modèles mongoDB des logs
const Logs = require('./models/logsM');

// Route de la page d'accueil
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});

app.use('/login', loginRouter);

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
