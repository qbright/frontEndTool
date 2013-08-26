var sockets = {};
module.exports = {


	regiestSocket: function(io) {
		io.of("/socket").on("connection", function(socket) {
			sockets[socket.id] = socket;
			var socket = sockets[socket.id];
			socket.emit("regiested", {
				socketId:socket.id 
			});
			//@TODO  结束时清除socketId
		});
	},
	emitEvent:function(socketId,eventName,data){
		sockets[socketId].emit(eventName,data);
	}
};