define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("jsonEditor");
			common.render("jsonEditorView",$("#main_container"),{con:"hasdfasdfasf"},function(){
				$("#jsonEditorContainer").html("{}");
				var j = new JSONEditor($("#jsonEditorContainer"), 400, 400);
       				j.doTruncation(true);
       				j.showFunctionButtons();
				common.progressEnd();
			});
		}
	};
});