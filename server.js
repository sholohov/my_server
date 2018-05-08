var http = require("http");
var url = require("url");
var ejs = require("ejs");
var fs = require("fs");
var os = require("os");
var staticResource = require("static-resource");

var port = 8080;
var serverUrl = "http://localhost:" + port + "/";
var root = './public';
var handler = staticResource.createHandler(fs.realpathSync(root));
var favicon = fs.realpathSync('./public/favicon.ico');

http.createServer(function(req, res) {
	const path = url.parse(req.url).pathname;
	if (path === "/") {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write(ejs.render(fs.readFileSync(root + "/index.html", "utf8"), {
			hostname: os.hostname()
		}));
		res.end();
	} else if (path === "/page_two") {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write(ejs.render(fs.readFileSync(root + "/page_two.html", "utf8"), {
			hostname: os.hostname()
		}));
		res.end();
	} else if (req.method === 'GET' && path === '/favicon.ico') {
		res.setHeader('Content-Type', 'image/x-icon');
		fs.createReadStream(favicon).pipe(res);
	} else {
		if (!handler.handle(path, req, res)) {
			res.writeHead(404);
			res.write("404");
			res.end();
		}
	}
}).listen(port);

console.log("The HTTP server has started at: " + serverUrl);