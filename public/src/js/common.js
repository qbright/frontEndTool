define(function(require,exports,module){
	module.exports = {
		render:function(tempId,jQueryTarget,data,callback){
			var tempHtml;
			if(tempId && data && jQueryTarget){
				tempHtml = template.render(tempId,data);
				jQueryTarget.html(tempHtml);
				callback && callback.call(this);
			}
		},
		getSid:function(){
			return $("#main_container").data("sid");
		},
		setFileName:function(fileName){
			$("#main_container").data("filename",fileName);
		},
		getFileName:function(){
			return $("#main_container").data("filename");
		},
		ajaxDownload:function(url,data,method){
			if(url && data){
				data = typeof data == "string" ? data:$.param(data);
				var inputs = "";
				$.each(data.split("&"),function(){
					var pair = this.split("=");
					inputs +="<input type='hidden' name='"+ pair[0] +"' value='"+ pair[1] +"' />";
				});
				var form = "<form action='" + url + "' method='" + (method || "get") + "'>" + inputs + "</form>";
				$(form).appendTo("body").submit().remove();
			}

		}
	};
});