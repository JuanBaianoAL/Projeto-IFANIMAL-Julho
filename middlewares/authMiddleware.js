const jwt = require('jsonwebtoken');
// verificar se o cookie (token) existe e se é valido
function autenticarToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
// se for invalido volta pro login
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.redirect('/login');
    }
    req.user = user;
    next();
  });
}

module.exports = autenticarToken;
