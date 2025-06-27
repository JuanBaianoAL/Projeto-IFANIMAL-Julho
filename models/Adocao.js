const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Adocao = sequelize.define('Adocao', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nomeAdotante: { type: DataTypes.STRING, allowNull: false },
  petId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pendente' },
  data: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'Adocoes',
  timestamps: false,
});


module.exports = Adocao;
