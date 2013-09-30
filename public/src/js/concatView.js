define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("concat");
            var tmp = [];
            tmp.length = 15;
            var data = {
                list:tmp
            }
			common.render("concatView",$("#main_container"),data,function(){
                common.initUpload($("#fileupload"), "file-upload", function() {
                    $("#arrayOne i").each(function(index){
                        $($("#arrayOne i")[index]).removeClass("icon-white");
                    });
                    $("#doConcat").attr("disabled", false).removeClass("disabled");
                    common.progressEnd();
                });
                $("#doConcat").click(function(){
                    common.progressStart();
                    var data = {
                        sid: common.getSid(),
                        socketId: common.getSocketId()
                    };
                    common.ajaxRequest("concat", data);
                });
                $("#downloadConcat").click(function() {
                    window.open("download?sid=" + common.getSid() +"&fileName=" + common.getFileName());
                    return false;
                });
                common.progressEnd();
			});
		}
	};
});