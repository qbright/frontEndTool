define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
            var callback = function(response) {
                var tmp = [];
                tmp.length = 10;
                var data = {
                    list: response,
                    tmpList:tmp
                };

                common.render("compressView", $("#main_container"), data, function() {

                    common.initUpload($("#fileupload"), "file-upload", function() {
                        $("#arrayOne i").each(function(index){
                            $($("#arrayOne i")[index]).removeClass("icon-white");
                        });
                        $("#doCompress").attr("disabled", false).removeClass("disabled");
                    });
                    $("#doCompress").click(function() {
                        common.progressStart();
                        var data = {
                            sid: common.getSid(),
                            socketId: common.getSocketId(),
                            rule:common.getJsonQuery($("#compressRuleForm input"))
                        };
                        common.ajaxRequest("compress", data, "post");
                    });
                    $("#downloadCompress").click(function() {
                        window.open("download?sid=" + common.getSid() +"&fileName=" + common.getFileName());
                        return false;
                    });
                    common.progressEnd();
                });
            };

            common.ajaxRequest("config", {
                config: "compressDefaultConfig"
            }, "get", "json", callback);

		}
	};
});