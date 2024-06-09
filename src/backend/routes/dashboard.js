const express = require('express');
const router = express.Router();

// Route de la page du tableau de bord (dashboard)
router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('dashboard');
});

module.exports = router;