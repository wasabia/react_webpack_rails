require('./react_bundle')
var http = require('http');
var React = require('react');
// var helloWorld = require('./app/react/components/hello-world-test.jsx');
var Log = console.log

PORT = 8080;

function handleRequest(request, response){
    Log(request.data);
    var e = React.createElement(comp, {});
    var co = React.renderToString(e);
    request.on('data', function(chunk) {
      Log("Received body data:");
      Log(chunk.attributes);
      Log(chunk.toString());
    });
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(co);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    Log("Server listening on: http://localhost:%s", PORT);
});
