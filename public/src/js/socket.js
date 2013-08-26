define(function(require, exports, module){
	module.exports = {
		registSocket:function(socket){
		 		socket.on('regiested', function (data) {
   					 	$("#main_container").data("socketid",data.socketId);
  					});

		 		socket.on("finishJsHint",function(data){
		 			console.log(data);
		 		});
		}
	}
});