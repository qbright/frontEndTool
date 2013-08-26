define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init: function() {
			var _this = this;
			common.render("hintView", $("#main_container"), {}, function() {
				common.initUpload($("#fileupload"), "file-upload",function(){
						$("#doHint").attr("disabled",false).removeClass("disabled");
				});
				$("#doHint").click(function(){
					common.progressStart();
					var data = {
						sid:common.getSid(),
						socketId:common.getSocketId()
					};
					common.ajaxRequest("jsHint",data);	
				});
				$("#download").click(function() {
					var data = {
						sid: common.getSid(),
						fileName: common.getFileName()
					};
					common.ajaxDownload("download", data);
					return false;
				});
				common.progressEnd();
			});

		},
	};
});