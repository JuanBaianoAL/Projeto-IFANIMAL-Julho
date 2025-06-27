const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Doacao = sequelize.define('Doacao', {
    id_doacao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    data: DataTypes.DATE,
    status: DataTypes.STRING,
    tipo: DataTypes.STRING,
    quantidade: DataTypes.INTEGER
}, {
    tableName: 'Doacoes',
    timestamps: true
});

Doacao.getAll = async function() {
    return await Doacao.findAll();
};

module.exports = Doacao;
