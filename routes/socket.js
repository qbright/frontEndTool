var sockets = {};
module.exports = {


	regiestSocket: function(io) {
		io.of("/socket").on("connection", function(socket) {
			sockets[socket.id] = socket;
			var socket = sockets[socket.id];
			socket.emit("regiested", {
				socketId: socket.id
			});

			socket.on("cleanSocket", function(data) {
				if (socket[data.socketId]) {
					delete sockets[data.socketId];
				}
			});
		});
	},
	emitEvent: function(socketId, eventName, data) {
		sockets[socketId].emit(eventName, data);
	}
};