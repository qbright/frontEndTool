var common = require("../modules/common");
module.exports = function(app, domain) {
	app.get(domain + "", function(req, res) {
			var userSid = common.generalRandom(10);
			common.generalWorkFolder(userSid);
			res.render("index", {
				title: "frontEndTool",
				sid:userSid
			});
	});

	app.get(domain + "/logout",function(req,res){
		//common.unzip("frontEndTool.zip",req.session.userid);
		res.end();
	});

	app.get(domain + "/check", function(req, res) {
		common.zip("frontEndTool.zip",req.session.userid,res);
	});
	app.get(domain + "/build", function(req, res) {
		//res.download("frontEndTool.zip");
	});
	app.get(domain + "/concat", function(req, res) {s
		res.end();
	});
	app.get(domain + "/compress", function(req, res) {
		res.end();
	});
	app.post(domain + "/file-upload", function(req, res, next) {
	/*	if (!req.session.userid) {
			console.log("create session");
			var buf = crypto.randomBytes(10).toString("hex");
			req.session.userid = buf;
		}*/
		//console.log("1");
		var sid = req.body.sid;
		var fileInfo = req.files.Filedata;
		var name = fileInfo.name;
		common.handlerFile(fileInfo.path,fileInfo.name,sid,res);
		
		//res.end();

	});
};