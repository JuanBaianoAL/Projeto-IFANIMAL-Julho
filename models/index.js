const sequelize = require('./db');
const Pet = require('./Pet');
const Adocao = require('./Adocao');
const User = require('./User');

Adocao.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });
Pet.hasOne(Adocao, { foreignKey: 'petId' });
Pet.belongsTo(User, { foreignKey: 'id_usuario', as: 'doador' });


Adocao.getAll = async function() {
  return await Adocao.findAll({
    include: [{ model: Pet, as: 'pet' }]
  });
};

module.exports = {
  sequelize,
  Pet,
  Adocao,
  User,
};
