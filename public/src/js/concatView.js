define(function(require, exports, module) {
	var common = require("./common");
	module.exports = {
		init:function(){
			seajs.log("concat");
           var  example =' <code> "concat":[</code><br>\
                <code>  {</code><br>                \
                <code>  "src":["options==.js","cd/options.js"],</code><br>\
                    <code>  "dist":"abc/options.concat.js"</code><br>      \
                        <code>  },</code><br>                               \
                            <code>  {</code><br>                             \
                                <code>  "src":["ab/1.js","ab/b.js","ab/c/1.js"],</code><br>\
                                    <code>  "dist":"def/concat.mininini.js"</code><br>      \
                                        <code>  }</code><br>                                 \
                                <code>  ]</code><br>';
            var tmp = [];
            tmp.length = 15;
            var data = {
                list:tmp,
                example:example
            }
			common.render("concatView",$("#main_container"),data,function(){
                common.initUpload($("#fileupload"), "file-upload", function() {
                    $("#arrayOne i").each(function(index){
                        $($("#arrayOne i")[index]).removeClass("icon-white");
                    });
                    $("#doConcat").attr("disabled", false).removeClass("disabled");
                    common.progressEnd();
                });
                $("#doConcat").click(function(){
                    common.progressStart();
                    var data = {
                        sid: common.getSid(),
                        socketId: common.getSocketId()
                    };
                    common.ajaxRequest("concat", data);
                });
                $("#downloadConcat").click(function() {
                    window.open("download?sid=" + common.getSid() +"&fileName=" + common.getFileName());
                    return false;
                });
                common.progressEnd();
			});
		}
	};
});