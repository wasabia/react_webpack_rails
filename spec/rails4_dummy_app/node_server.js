// @mxaly pls comment on this, you know better
global.window = global;
global.__RWR_ENV__ = {};

// Using Babel require hook to enable ES2015 in the file
// Source: http://babeljs.io/docs/usage/require/
require('babel-core/register');

// Enable our integrations manager
const IM = require('react-webpack-rails').integrationsManager;

// Enable RWR on window and load our custom React components:
require('./app/react/index');

// Load dependencies
const http = require('http');
const dispatcher = require('httpdispatcher');

const PORT = 8081;

// Main function to handle incoming requests
function handleRequest(request, response){

  // try-catch ensures the server won't crash
  try {
    console.log(`started: ${request.method} "${request.url}" at ${new Date().toLocaleTimeString()}`);

    // Route request to proper endpoint
    dispatcher.dispatch(request, response);

  // Passing errors to Rails as-is
  } catch(ex) {
    console.log(ex)
    response.writeHead(500);
    response.end(ex.name + ': ' + ex.message);
  }
}

// '/run' endpoint
dispatcher.onPost("/run", function(request, response) {
  // try-catch ensures the server won't crash
  try {
    const data = JSON.parse(request.body);

    // Pass data to our custom integration method
    // The data object includes integration name 'react-component'
    // This determines which integration to use
    const result = IM.runNodeIntegration(data);

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(result);

  // Passing errors to Rails as-is
  } catch(ex) {
    console.log(ex)
    response.writeHead(500);
    response.end("nodeRun failed:\n" + ex.name + ': ' + ex.message);
  }
});

const server = http.createServer(handleRequest);

// Run the server on specific port
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
