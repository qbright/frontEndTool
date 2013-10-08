define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("docView");
			var tmp = [];
			tmp.length = 10;
			var data = {
				list:tmp
			}
			common.render("docView",$("#main_container"),data,function(){
				common.initUpload($("#fileupload"), "file-upload", function() {
						$("#arrayOne i").each(function(index){
							$($("#arrayOne i")[index]).removeClass("icon-white");
						});
						$("#doDoc").attr("disabled", false).removeClass("disabled");
						common.progressEnd();
					});
					$("#doDoc").click(function(){
						common.progressStart();
						var data = {
							sid: common.getSid(),
							socketId: common.getSocketId()
						};
						common.ajaxRequest("generalJsDoc", data);
					});
					$("#downloadDoc").click(function() {
						window.open("download?sid=" + common.getSid() +"&fileName=" + common.getFileName());
						return false;
					});
				common.progressEnd();
			});
		}
	};
});