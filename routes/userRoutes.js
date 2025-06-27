const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// GET para exibir a pagina de Login
router.get('/login', (req, res) => {
  res.render('login', { erro: null });
});
// POST para processar o login do usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
// Procura o usuario no banco com o email informado
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render('login', { erro: 'Usuário não encontrado.' });
    }

    const senhaCorreta = bcrypt.compareSync(senha, user.senha);
    if (!senhaCorreta) {
      return res.render('login', { erro: 'Senha incorreta.' });
    }
    // Gera um Token com email do usuario com no maximo colocado no codigo
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '5h' });
    // Armazena o token em um cookie valido por 5 horas
    res.cookie('token', token, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 });
// Rediriona para a pagina home
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.render('login', { erro: 'Erro no servidor.' });
  }
});
// GET para encessar a sessão do usuario
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;
