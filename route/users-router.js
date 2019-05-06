const router = require('express').Router();
const userdb = require('../users/users-model');
const bcrypt = require('bcryptjs');
const protected = require('../auth/protected-mw');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    userdb.add(user)
        .then(saved => {
            console.log(saved)
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    userdb.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Hello ${user.username}!` });
              } else {
                res.status(401).json({ message: 'Invalid Credentials' });
              }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.get('/users', protected, (req, res) => {
    userdb.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = router;