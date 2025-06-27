const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function criarUsuarioPadrao() {
  try {
    const user = await User.findOne({ where: { email: 'Ifanimalgatos@gmail.com' } });
    if (!user) {
      const senhaHash = bcrypt.hashSync('ifal20251', 10);
      await User.create({ email: 'Ifanimalgatos@gmail.com', senha: senhaHash });
      console.log('Usuário padrão criado: Ifanimalgatos@gmail.com / ifal20251');
    }
  } catch (error) {
    console.error('Erro ao criar usuário padrão:', error);
  }
}

module.exports = criarUsuarioPadrao;
