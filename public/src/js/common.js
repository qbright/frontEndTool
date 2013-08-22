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
		}
	};
});