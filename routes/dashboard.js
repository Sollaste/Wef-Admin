const express = require('express');
const router = express.Router();

// Route de la page du tableau de bord (dashboard)
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.render(path.join(__dirname, '../views', 'dashboard'));
    }
    res.render(__dirname + '');
});

module.exports = router;