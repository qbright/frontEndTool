var imagemin = require("imagemin");


imagemin("test/","test/dist",function(){
	console.log("finish");
});