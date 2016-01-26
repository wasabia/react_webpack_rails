"use strict";
global.window = global;
global.__RWR_ENV__ = {};
require('babel-core/register');
require('./app/react/index');

let http, dispatcher, PORT;
http = require('http');
dispatcher = require('httpdispatcher');
PORT = 8080;

function handleRequest(request, response){
  try {
    console.log(request.url);
    dispatcher.dispatch(request, response);
  } catch(ex) {
    console.log(ex)
    response.writeHead(500);
    response.end(ex.name + ': ' + ex.message);
  }
}

dispatcher.onPost("/run", function(request, response) {
  try {
    let data, result;
    data = JSON.parse(request.body);
    result = RWR.integrationsManager.runNodeIntegration(data);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(result);
  } catch(ex) {
    console.log(ex)
    response.writeHead(500);
    response.end("nodeRun failed:\n" + ex.name + ': ' + ex.message);
  }
});

dispatcher.onPost("/reset", function(request, response) {
  try{
    RWR.integrationsManager.resetNodeIntegrations();
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end();
  } catch(ex) {
    console.log(ex)
    response.writeHead(500);
    response.end("nodeReset failed:\n" + ex.name + ': ' + ex.message);
  }
});

const server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
