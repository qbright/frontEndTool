define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
            var tmp = [];
            tmp.length = 10;
            var data = {
                list:tmp
            }
            common.render("buildView",$("#main_container"),data,function(){
                common.initUpload($("#fileupload"), "file-upload", function() {
                    $("#arrayOne i").each(function(index){
                        $($("#arrayOne i")[index]).removeClass("icon-white");
                    });
                    $("#doBuild").attr("disabled", false).removeClass("disabled");
                    common.progressEnd();
                });
                $("#doBuild").click(function(){
                    common.progressStart();
                    var data = {
                        sid: common.getSid(),
                        socketId: common.getSocketId(),
                        rule:common.getJsonQuery($("#buildRuleForm input"))
                    };
                    common.ajaxRequest("build", data);
                });
                $("#downloadBuild").click(function() {
                    window.open("download?sid=" + common.getSid() +"&fileName=" + common.getFileName());
                    return false;
                });
                common.progressEnd();
            });
		}
	};
});