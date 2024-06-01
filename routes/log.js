const express = require('express');
const router = express.Router();

// Importation du modèle de log - MongoDB
const LogModel = require('../models/logsM');

// API de gestion des logs
router.route('/logs')
    // API permettant de stocker les logs dans la base de données
    .post(async (req, res) => {
        const log = new LogModel({
            ...req.body
          });
          
        try {
            await log.save();
            res.status(201).json({ message: 'Log enregistré !'});
        } catch (error) {
            res.status(400).json({ error });
        }
    })
    // API permettant d'afficher les logs
    .get(async (req, res) => {
        try {
          const log = await LogModel.find();
          res.status(200).json(log);
        } catch (error) {
          res.status(500).send('Erreur lors de la récupération du log');
        }
    })
;

module.exports = router;
