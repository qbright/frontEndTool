define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("concat");
			common.render("concatView",$("#main_container"),{con:"dafqweqweqe"});
		}
	};
});