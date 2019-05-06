const bcrypt = require('bcryptjs');
const userdb = require('../users/users-model');

function protected(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    userdb.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: 'Please provide credentials' });
  }
}

module.exports = protected;