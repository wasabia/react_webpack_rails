require('./app/assets/javascripts/react_bundle');
http = require('http');
ReactDOMServer = require('react-dom/server');

PORT = 8080;

function handleRequest(request, response) {
  request.on('data', function(chunk){
    data = JSON.parse(chunk.toString());
    react_component = RWR.createComponent(data.name, data.props);
    component_stringified = ReactDOMServer.renderToString(react_component);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(component_stringified);
  });
};

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
