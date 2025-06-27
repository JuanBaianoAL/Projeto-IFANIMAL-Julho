const { DataTypes, Op } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');
const Adocao = require('./Adocao');

const Pet = sequelize.define('Pet', {
  id_pet: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  raca: DataTypes.STRING,
  idade: DataTypes.INTEGER,
  sexo: DataTypes.STRING,
  cadastro: DataTypes.BOOLEAN,
  cuidados: DataTypes.STRING,
  deficiencia: DataTypes.STRING,
  castracao: DataTypes.BOOLEAN,
  vacinacao: DataTypes.BOOLEAN,
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_usuario'
    }
  }
}, {
  tableName: 'Pets',
  timestamps: false
});

Pet.findPetsNaoAdotados = async function () {
  const adotados = await Adocao.findAll({ attributes: ['petId'] });
  const idsAdotados = adotados.map(a => a.petId);

  return await Pet.findAll({
    where: {
      id_pet: {
        [Op.notIn]: idsAdotados
      }
    }
  });
};

module.exports = Pet;
