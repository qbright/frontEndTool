define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init: function() {
			var _this = this;
			var callback = function(response) {
				var tmp = [];
					tmp.length = 15;
				var data = {
					list: response,
					tmpList:tmp
				};

				common.render("hintView", $("#main_container"), data, function() {

					common.initUpload($("#fileupload"), "file-upload", function() {
						$("#hintContainer i").each(function(index){
								$($("#hintContainer i")[index]).removeClass("icon-white");
						});
						$("#doHint").attr("disabled", false).removeClass("disabled");
					});
					$("#doHint").click(function() {
						common.progressStart();
						var data = {
							sid: common.getSid(),
							socketId: common.getSocketId(),
							rule: _this.getJsonQuery()
						};
						common.ajaxRequest("jsHint", data, "post");
					});
					$("#download").click(function() {
						window.open("download?sid=" + common.getSid() +"&fileName=" + common.getFileName());
						return false;
					});
					common.progressEnd();
				});
			};

			common.ajaxRequest("config", {
				config: "hintDefaultConfig"
			}, "get", "json", callback);

		},
		getJsonQuery: function() {
			var jsonObj = {};
			$("#jsHintRuleForm input").each(function() {
				var $this = $(this);
				jsonObj[$this.attr("name")] = Boolean($this.prop("checked"));
			});
			console.log(jsonObj);
			return JSON.stringify(jsonObj);
		}
	};
});