const server = require('./api/server');

const pot = 5000;
server.listen(port, () => {
    console.log(`\n* Listening on ${port} *\n`)
});