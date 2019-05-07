const router = require('express').Router();
const userdb = require('./users-model');
const restricted = require('../auth/restricted-mw');

router.get('/users', restricted, (req, res) => {
    userdb.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
});

router.get('/something', restricted, (req, res) => {
  const username = req.session.username;
  res.send(`Hey ${username}, you found something!`);
});

router.get('/a', restricted, (req, res) => {
  const username = req.session.username;
  res.send(`Hey ${username}, aaaaaaaaaaaaaaaaaaaaaaa!`);
});

module.exports = router;