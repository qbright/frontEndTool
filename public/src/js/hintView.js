define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			var _this = this;
			seajs.log("hint");
			common.render("hintView",$("#main_container"),{},function(){
				$("#fileupload").uploadify({
					"swf":"/js/lib/uploadify.swf",
					"uploader":"file-upload",
					"buttonText":"请选择文件",
					"itemTemplate":"<div> </div> ",
					"preventCaching":true,
					"formData":{sid:common.getSid()}
				});
			});


		},
	};
});