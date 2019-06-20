import * as bodyParser from 'body-parser';
import express from 'express';
import apiRoutes from 'app/routes';
import SocketRouter from 'app/socket';
import AppFactory from 'factory'
import exceptionHandler from 'app/exceptions/handler';
// var bugsnag = require('@bugsnag/js')
// var bugsnagExpress = require('@bugsnag/plugin-express')
// var bugsnagClient = bugsnag('6a55b9db2f15302ab5fda3d04b339b00')
// bugsnagClient.use(bugsnagExpress)

var http = require('http');


const app = express();
const port = process.env.PORT || 3030;
// var middleware = bugsnagClient.getPlugin('express')

// This must be the first piece of middleware in the stack.
// It can only capture errors in downstream middleware
// app.use(middleware.requestHandler)

// Configure express middlewares
app.use(require('helmet')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization");
	next();
});

// Set api routes
app.use('/api', apiRoutes);
app.use('**', (req, res) => {
	res.status(400).json({
		success: false,
		message: "Requested resource not found."
	})
});
// Set exception handler
// if (process.env.NODE_ENV === 'production') app.use(middleware.errorHandler)
// else app.use(exceptionHandler)

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

AppFactory.initSocket(server)

new SocketRouter(AppFactory.server).init();

  /**
   * Event listener for HTTP server "error" event.
   */
  /**
   *
   *
   * @param {*} error
   */
  function onError(error) {
	if (error.syscall !== 'listen') {
	  throw error;
	}
  
	var bind = typeof port === 'string'
	  ? 'Pipe ' + port
	  : 'Port ' + port;
  
	// handle specific listen errors with friendly messages
	switch (error.code) {
	  case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	  case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	  default:
		throw error;
	}
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
	console.log('Listening on ' + bind);
	}
	export default app;
