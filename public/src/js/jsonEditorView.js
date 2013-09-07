define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			common.render("jsonEditorView",$("#main_container"),{con:"hasdfasdfasf"},function(){
				$("#jsonEditorContainer").html('{}').css("resize","none");
				var j = new JSONEditor($("#jsonEditorContainer"), 920, 550);
       				j.doTruncation(true);
				common.progressEnd();
			});
		}
	};
});