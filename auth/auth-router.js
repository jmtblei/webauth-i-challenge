const router = require('express').Router();
const userdb = require('../users/users-model');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    userdb.add(user)
        .then(saved => {
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
                req.session.username = user.username;
                res.status(200).json({ message: `Hello ${user.username}!` });
              } else {
                res.status(401).json({ message: 'Invalid Credentials' });
              }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    const username = req.session.username;
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send(`You're here forever....`);
        } else {
          res.send(`Goodbye ${username}`)
        }
      });
    }
});

module.exports = router;