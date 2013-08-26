var common = require("../modules/common"),
	socket = require("./socket");
module.exports = function(app, domain) {
	app.get(domain + "", function(req, res) {
		var userSid = common.generalRandom(10);
		common.generalWorkFolder(userSid);
		res.render("index", {
			title: "frontEndTool",
			sid: userSid
		});
	});

	app.get(domain + "/logout", function(req, res) {
		//common.unzip("frontEndTool.zip",req.session.userid);
		console.log(sockets);
		res.end();
	});

	app.get(domain + "/jsHint", function(req, res) {
			common.swapCP("./modules/hint",req.query.sid,function(result){
				result.data.forEach(function(data){
					console.log(data.error.reason);

				});
				socket.emitEvent(req.query.socketId,"finishJsHint",result.data);
			});
			res.end();
	});
	app.get(domain + "/build", function(req, res) {
		//res.download("frontEndTool.zip");

	});
	app.get(domain + "/concat", function(req, res) {
		res.end();
	});
	app.get(domain + "/compress", function(req, res) {
		res.end();
	});
	app.get(domain + "/download", function(req, res) {
		var sid = req.query.sid,
			fileName = req.query.fileName;
		common.writeZipToResponse(sid, fileName, res);
	});
	app.post(domain + "/file-upload", function(req, res, next) {
		var sid = req.body.sid,
			fileInfo = req.files.Filedata;
			common.handlerFile(fileInfo.path, fileInfo.name, sid, res);

	});

};