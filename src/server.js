'use strict';
import routes from './api';
const Hapi = require('hapi');
const Redis = require ('./util/redis')

const config = require('./config')
const logger = require('./logger')

global.redisClient = new Redis({
    hostPortString: config.get('redisHost')
}, logger)

// Create a server with a host and port
const server = Hapi.server({ 
    host: 'localhost', 
    port: config.get('port')
});

// Add the route
server.route(routes);

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    logger.info('Server running at:', server.info.uri);
    console.log('Server running at:', server.info.uri);
};

start();