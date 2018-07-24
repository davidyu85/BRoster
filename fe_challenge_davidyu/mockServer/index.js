/**
 * Mock Server via JSON-Server, created for mocking the 
 * backend apis behaviors based on the given data in JSON.
 **/

/* global require */
var jsonServer = require('json-server');
var serverRoutes = require('./serverRoutes.js');
var server = jsonServer.create();
var router = jsonServer.router(serverRoutes());
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Run the mock server on port 3999
server.listen(3999, function() {
  console.log('*****************************');
  console.log('* Mock Server is running... *');
  console.log('*****************************')
});