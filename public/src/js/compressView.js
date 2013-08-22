define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("compress");
			common.render("compressView",$("#main_container"),{con:"hasdfasdfasf"},function(){
				common.progressEnd();
			});
		}
	};
});