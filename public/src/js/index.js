define(function(require, exports, module) {

	var hintView = require("./hintView"),
		concatView = require("./concatView"),
		buildView = require("./buildView"),
		compressView = require("./compressView"),
		common = require("./common");
		
	module.exports = {
		
		initHome:function(){
			var host = "http://" + window.location.host;
			this.bindEvent();
			var socket = io.connect(host + "/socket");
				 socket.on('emit', function (data) {
   					 	console.log(data);
  					});


		},

		bindEvent:function(){
			$("#nav_menu li").click(function(){
				var $target = $(this),
					url = $target.data("url");
					common.progressStart();
				switch(url){
					case "hint": hintView.init();break;
					case "concat":concatView.init();break;
					case "compress":compressView.init();break;
					case "build":buildView.init();break;
				}
				$("#nav_menu li").removeClass("active");
				$target.addClass("active");
			});
/*
			window.onbeforeunload = function(event){
            	return confirm("确定退出吗"); 
          	}*/

          	hintView.init();
		}
	};
});