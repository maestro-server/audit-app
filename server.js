'use strict';

/*
 * Load .env
 */
require('dotenv').config();


let app = require('./app/app');
let http = require('http');

let server;

/*
 * Create and start HTTP server.
 */
process.env.MAESTRO_PORT = process.env.MAESTRO_PORT || 10900;

server = http.createServer(app);
server.listen(process.env.MAESTRO_PORT);
server.on('listening', function () {
    console.log('Maestro: Server listening on http://localhost:%d', this.address().port);
});