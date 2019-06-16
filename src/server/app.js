import http from 'http';
import mongoose from 'mongoose';

import api from '../api';
import { log } from '../modules/logger';
import config from '../../config/server';

const normalizePort = (val) => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(config.port);

/**
 * Create HTTP server.
 */

const server = http.createServer(api);

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  log.warn('Listening on ' + bind, ',', addr);
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      break;
    default:
      throw error;
  }

  process.exit(1);
};

/**
 * Get port from environment and store in Express.
 */

api.set('port', port);
api.set('address', config.base_url);

/**
* Start Server, Connect to DB
*/

server.listen(port, () => {
	// establish connection to mongodb

  mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri, { useNewUrlParser: true });

	const db = mongoose.connection;

	db.on('error', err => {
		log.error(err);
		//process.exit(1);
	});

	db.once('open', () => {
    log.info('DB Started!');
  });

  log.info(`Server is listening on port ${config.port}`);
});

server.on('error', onError);
server.on('listening', onListening);

export default server;