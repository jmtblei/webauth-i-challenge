const express = require('express');
const helmet = require('helmet');

const usersRouter = require('../route/users-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.send("It's alive")
});

module.exports = server;