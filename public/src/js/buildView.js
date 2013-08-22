define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("buildView");
			common.render("buildView",$("#main_container"),{con:"helllllllooooo"});
		}
	};
});