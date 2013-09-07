var doxmate = require("doxmate"),
	fs = require("fs"),
	path = require("path"),
	WORKSPACE_PATH = "workspace",
	sourcePath = path.join(WORKSPACE_PATH,process.argv[2]),
	targetPath = path.join(__dirname,"../" + sourcePath,"doc");
if(!fs.existsSync(targetPath)){
	fs.mkdirSync(targetPath);
}
doxmate.process(sourcePath,targetPath,"default");

process.send({
	status:true
});
//process.exit(0);