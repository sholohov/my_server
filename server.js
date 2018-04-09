var http = require('http');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
	ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var requestHandler = function(request, response) {
	console.log(request.url);
	response.end('Hello Node.js Server!');
};

var server = http.createServer(requestHandler);

server.listen(port, ip, function(err) {
	if (err) {
		return console.log('something bad happened', err);
	}
	console.log(ip + ":" + port);
});