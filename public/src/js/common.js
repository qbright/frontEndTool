define(function(require, exports, module) {
	module.exports = {
		render: function(tempId, jQueryTarget, data, callback) {
			var tempHtml;
			if (tempId && data && jQueryTarget) {
				tempHtml = template.render(tempId, data);
				jQueryTarget.css("display","none");
					jQueryTarget.html(tempHtml);
					callback && callback.call(this);
					jQueryTarget.fadeIn();
			}
		},
		getSid: function() {
			return $("#main_container").data("sid");
		},
		getSocketId:function(){
			return $("#main_container").data("socketid");
		},
		setFileName: function(fileName) {
			$("#main_container").data("filename", fileName);
		},
		getFileName: function() {
			return $("#main_container").data("filename");
		},
		download: function(url) {
			window.open(url);

		},
		ajaxRequest:function(url,data,type,dataType,cb,async){
			var this_ = this;
			$.ajax({
				url:url,
				type:type || "get",
				data:data,
				dataType:dataType||"html",
				async:async || true,
				cache:false,
				success:function(request){
					cb && cb.call(this_,request);
				},
				error:function(error){
					alert("出错！" + error);
				}

			});
		},
		progressStart: function() {
			NProgress.start();
		},
		progressEnd: function() {
			NProgress.done();
		},
		initUpload: function(target, url, callback) {
			var this_ = this;
			target.uploadify({
				"swf": "/js/lib/uploadify.swf",
				"uploader": url,
				"buttonText": "请选择文件",
				"itemTemplate": "<div> </div> ",
				"preventCaching": true,
				"formData": {
					sid: this_.getSid()
				},
				"onUploadSuccess": function(file) {
					this_.progressEnd();
					this_.setFileName(file.name);
					callback && callback.call(this_, file);
				},
				"onUploadStart": function() {
					this_.progressStart();
				}
			});
		},
        getJsonQuery:function(target){
            var jsonObj = {};
            if(target.each){
                target.each(function() {
                    var $this = $(this);
                    jsonObj[$this.attr("name")] = Boolean($this.prop("checked"));
                });
                console.log(jsonObj);
                return JSON.stringify(jsonObj);
            }else{
                return {};
            }

        }
	};
});