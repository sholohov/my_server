var http = require('http');

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var requestHandler = function(request, response) {
	console.log(request.url);
	response.end('Hello Node.js Server!');
};

var server = http.createServer(requestHandler);

server.listen(server_port, server_ip_address, function(err) {
	if (err) {
		return console.log('something bad happened', err);
	}
	console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});