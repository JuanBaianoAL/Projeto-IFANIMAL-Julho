const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
// GET para listar todos os pets cadastrados
router.get('/', async (req, res) => {
  const pets = await Pet.findAll();
  res.render('pets', { pets });
});
// GET para exibir o formulário de cadastro pet
router.get('/cadastrar', (req, res) => {
  res.render('pets/cadastrar');
});
// POST para cadastro de um novo pet
router.post('/', async (req, res) => {
  await Pet.create(req.body);
  res.redirect('/pets');
});
// POST para excluir um pet
router.post('/excluir', async (req, res) => {
  try {
    const id = req.body.id_pet;
    if (!id) {
      return res.status(400).send('ID do pet é obrigatório para exclusão.');
    }
    await Pet.destroy({ where: { id_pet: id } }); // Exclui o pet do banco de dados
    res.redirect('/pets');
  } catch (error) {
    console.error('Erro ao excluir pet:', error);
    res.status(500).send('Erro ao excluir pet');
  }
});


module.exports = router;
