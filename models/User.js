const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  endereco: DataTypes.STRING,
  num_telefone: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  condicoes: DataTypes.STRING
}, {
  tableName: 'Users',
  timestamps: true
});

module.exports = User;
