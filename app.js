/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	io = require("socket.io"),
	root = require("./routes/root"),
	cluster = require("cluster"),
	numCpus = require("os").cpus().length;

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set("strict routing", false);
app.set("domain", "/frontEndTool");
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
	uploadDir: './uploads'
}));
app.use(express.cookieParser());
app.use(express.session({
	secret: "frontEndTool"
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public/src')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
}
var server = http.createServer(app);
root.regiest(app, app.get("domain"));
root.regiestSocket(io.listen(server).set("log level", 0));

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
/*
if (cluster.isMaster) {
	for (var i = 0; i < numCpus; i++) {
		cluster.fork();
	}
	*/
/*cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});*//*

} else {
	server.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});
}*/
