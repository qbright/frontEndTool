define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		registSocket: function(socket) {
			socket.on('regiested', function(data) {
				$("#main_container").data("socketid", data.socketId);
			});
			socket.on("finishJsHint", function(data) {
				var data = {
					list: data
				}
				common.render("jsHintResult", $("#hint-result"), data, function() {
					common.progressEnd();
				});
			});
		},
		cleanSocket:function(socket){
			socket.emit("cleanSocket",{socketId:common.getSocketId()});
		}
	}
});