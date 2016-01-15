require('./app/assets/javascripts/react_bundle')
var http = require('http');
var React = require('react');
var Log = console.log

PORT = 8080;

function handleRequest(request, response){
  Log(request.data);
  Log(request.name);
  var e = RWR.createComponent('HelloWorld', {});
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
