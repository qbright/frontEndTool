define(function(require, exports, module) {

	var hintView = require("./hintView"),
		concatView = require("./concatView"),
		buildView = require("./buildView"),
		compressView = require("./compressView"),
		jsonEditorView = require("./jsonEditorView"),
		docView = require("./docView"),
		common = require("./common"),
		socket = require("./socket");

	module.exports = {
		socket: null,
		initHome: function() {
			var host = "http://" + window.location.host;
			this.socket = io.connect(host + "/socket");
			this.bindEvent();
			socket.registSocket(this.socket);



		},

		bindEvent: function() {
			var this_ = this;
			$("#nav_menu li").click(function() {
				var $target = $(this),
					url = $target.data("url");
				common.progressStart();
				switch (url) {
					case "hint":
						hintView.init();
						break;
					case "concat":
						concatView.init();
						break;
					case "compress":
						compressView.init();
						break;
					case "build":
						buildView.init();
						break;
					case "jsonEditor":
						jsonEditorView.init();
						break;
					case "doc":
						docView.init();
						break;
				}
				$("#nav_menu li").removeClass("active");
				$target.addClass("active");
			});
			window.onbeforeunload = function() {
					$.ajax({
						url:"clean",
						async:false,
						beforeSend:function(){
							socket.cleanSocket(this_.socket);
						},
						data:{sid:common.getSid()}
					});
			}
			hintView.init();
		}
	};
});