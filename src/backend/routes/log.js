const express = require('express');
const router = express.Router();

const LogModel = require('../models/logsM');

// API de gestion des logs
router.route('/logs')
    // API permettant de stocker les logs dans la base de données
    .post(async (req, res) => {
        try {
            if (req.headers['wefrei_api_key'] !== undefined && req.headers['wefrei_api_key'] === process.env.WEFREI_API_KEY) {
                console.log(req.body)
                let log_entry = req.body
                await LogModel.collection.insertOne({
                    ts: log_entry.ts,
                    level: log_entry.level,
                    messge: log_entry.msg,
                });
                res.status(201).json({ message: 'Log enregistré !'});
            } else {
                res.status(403).json({ message: "wrong or missing api key, please specify api key in a WEFREI_API_KEY HTTP header."})
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ error });
        }
    })
    // API permettant d'afficher les logs 
    .get(async (req, res) => {
        if (!req.session.userId) {
            return res.redirect('/login');
        }
        try {
          const log = await LogModel.find();
          res.status(200).json(log);
        } catch (error) {
          res.status(500).send('Erreur lors de la récupération du log');
        }
    })
;

module.exports = router;
