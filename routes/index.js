var common = require("../modules/common"),
	socket = require("./socket");
module.exports = function(app, domain) {
	app.get(domain + "", function(req, res) {
		if (req.url.substr(req.url.length - 1) != "/") {
			res.redirect("/frontEndTool/");
		}
		var userSid = common.generalRandom(10);
		common.generalWorkFolder(userSid);
		res.render("index", {
			title: "frontEndTool",
			sid: userSid
		});
	});

	app.get(domain + "/logout", function(req, res) {
		res.end();
	});

	app.post(domain + "/jsHint", function(req, res) {
        console.log(req.body.sid);
        console.log(req.body.rule);

		common.swapCP("./modules/hint", [req.body.sid, req.body.rule], function(result) {
            console.log(result.data);
			socket.emitEvent(req.body.socketId, "finishJsHint", result.data);
		});
		res.end();
	});
	app.get(domain + "/build", function(req, res) {
		//res.download("frontEndTool.zip");

	});
	app.get(domain + "/concat", function(req, res) {
        console.log("concat");
        common.swapCP("./modules/concat",[req.query.sid],function(result){
            console.log(result);
            socket.emitEvent(req.query.socketId,"finishConcat");
        });
		res.end();
	});
	app.post(domain + "/compress", function(req, res) {

        common.swapCP("./modules/compress",[req.body.sid,req.body.rule],function(result){
            socket.emitEvent(req.body.socketId,"finishCompress");
        });
		res.end();
	});
	app.get(domain + "/download", function(req, res) {
		var sid = req.query.sid,
			fileName = req.query.fileName;
		common.writeZipToResponse(sid, fileName, res);
	});
	app.get(domain + "/clean", function(req, res) {
		common.removeWorkFolder(req.query.sid);
		res.end();
	});
	app.get(domain + "/config", function(req, res) {
		res.json(common.loadConfig(req.query.config));
	});
	app.post(domain + "/file-upload", function(req, res, next) {
		var sid = req.body.sid,
			fileInfo = req.files.Filedata;
		common.handlerFile(fileInfo.path, fileInfo.name, sid, res);
	});
	app.get(domain + "/generalJsDoc",function(req,res,next){
		common.swapCP("./modules/jsDoc", [req.query.sid], function(result) {
			socket.emitEvent(req.query.socketId, "finishJsDoc");
		});
		res.end();
	});

};