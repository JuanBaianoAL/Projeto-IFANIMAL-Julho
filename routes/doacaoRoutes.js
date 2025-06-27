const express = require('express');
const router = express.Router();
const Doacao = require('../models/Doacao');
// GET para exibição a pagina e com todas as doacoes
router.get('/', async (req, res) => {
  const doacoes = await Doacao.getAll();
  res.render('doacoes', { doacoes });
});
// POST para cadastro de uma nova doacao
router.post('/', async (req, res) => {
  const { tipo, quantidade, status } = req.body;
  await Doacao.create({
    tipo,
    quantidade,
    status,
    data: new Date()
  });
  res.redirect('/doacoes'); // Redirecionamento para pagina doacoes
});

module.exports = router;
