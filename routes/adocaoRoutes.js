const express = require('express');
const router = express.Router();
const { Adocao, Pet } = require('../models');
// GET para exibir na pagina de adocoes
router.get('/', async (req, res) => {
  try {
    const adocoes = await Adocao.getAll();
    const petsDisponiveis = await Pet.findPetsNaoAdotados();
    res.render('adocoes', { adocoes, petsDisponiveis });
  } catch (error) {
    console.error('Erro ao carregar adoções:', error);
    res.status(500).send('Erro ao carregar página de adoções: ' + error.message);
  }
});
// POST para registrar uma nova adocao
router.post('/', async (req, res) => {
  const { nomeAdotante, petId, status } = req.body;
// Verificações
  if (!nomeAdotante) {
    return res.status(400).send('Nome do adotante é obrigatório');
  }
  if (!petId) {
    return res.status(400).send('ID do pet é obrigatório');
  }
// Buscar o pet pelo ID
  try {
    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(400).send('Pet informado não existe');
    }
// Olha ja se foi adotado com o status confirmado
    const jaAdotado = await Adocao.findOne({
      where: {
        petId,
        status: 'confirmado'
      }
    });
// se ja foi adotado vai dar erro se tentar denovo
    if (jaAdotado) {
      return res.status(400).send('Este pet já foi adotado');
    }

    await Adocao.create({
      nomeAdotante,
      petId,
      status: status || 'pendente',
      data: new Date()
    });
// voltar para a pagina de adocoes
    res.redirect('/adocoes');
  } catch (error) {
    console.error('Erro ao criar adoção:', error);
    res.status(500).send('Erro ao criar adoção: ' + error.message);
  }
});

module.exports = router;
