var index = require("./index"),
	socket = require("./socket");

module.exports.regiest = function(app,domain){
	index(app,domain);

};
module.exports.regiestSocket = function(io){
	socket.regiestSocket(io);
};
