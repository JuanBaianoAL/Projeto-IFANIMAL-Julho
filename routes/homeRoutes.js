const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/authMiddleware');
// Rota protegina GET para a pagina home
router.get('/home', autenticarToken, (req, res) => {
  res.render('home', { usuario: req.user });
});

module.exports = router;
