define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("jsonEditor");
			common.render("jsonEditorView",$("#main_container"),{con:"hasdfasdfasf"},function(){
				$("#jsonEditorContainer").html('{"names": ["andy","ben","sam" ],\
  "some_object": { "foo": "bar","baz": [{"woah": "there"},{"test":"here"}],\
    "long_line": "a b c d e f g h i j | a b c d e f g h i j | match(/dflkjdfkjhdfkjhdf/) | dfjkhsdfh | a b c d e f g h i j" }}').css("resize","none");
				var j = new JSONEditor($("#jsonEditorContainer"), 920, 400);
       				j.doTruncation(true);
       			//	j.showFunctionButtons(false);
				common.progressEnd();
			});
		}
	};
});