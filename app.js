const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

const sequelize = require('./models/db');
const autenticarToken = require('./middlewares/authMiddleware');

const { Adocao, Pet, User } = require('./models');
// Importacao de arquivos das rotas
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const adocaoRoutes = require('./routes/adocaoRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
// Define a pasta public, além de configurar o body-parser e habilitar os cookies
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const jwt = require('jsonwebtoken');

// Redirecionar  para o login
app.get('/', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.redirect('/login');
      }
      return res.redirect('/home');
    });
  } else {
    res.redirect('/login');
  }
});


// Rotas
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/pets', petRoutes);
app.use('/adocoes', adocaoRoutes);
app.use('/doacoes', doacaoRoutes);

const criarUsuarioPadrao = require('./utils/criarUsuario');

async function start() {
  try {
    await sequelize.sync({ force: false });
    console.log('Banco sincronizado com sucesso!');

    await criarUsuarioPadrao();

    app.listen(port, () => console.log(`IFanimal rodando na porta ${port}!`));
  } catch (err) {
    console.error('Erro ao sincronizar o banco:', err);
  }
}

start();


  //http://localhost:3000/

