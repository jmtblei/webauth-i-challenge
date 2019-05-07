const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const sessionConfig = {
    name: 'TopSecret',
    secret: 'Super duper well-kept swear-on-your-life well-kept pink-promise secret',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 1,
        secure: false,
    },
    resave: false,
    saveUninitialized: true,
};

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express();

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());

server.use('/api', authRouter);
server.use('/api/restricted', usersRouter);

server.get('/', (req, res) => {
    const username = req.session.username || 'stranger';
    res.send(`Welcome, ${username}!`);
});

module.exports = server;