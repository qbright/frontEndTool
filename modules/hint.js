var jshintCli = require("jshint/src/cli"),
	common = require("../modules/common"),
	path = require("path"),
	WORKSPACE_PATH = "workspace";
	var files = [];
		files.push(path.join(WORKSPACE_PATH, process.argv[2]));
	var options = common.loadConfig("hintOption"),
		config = common.loadConfig("hintDefaultConfig"),
		hintResults = [];
		options.config = config;
		
	options.reporter = function(results,data){
		hintResults = results;
	};
	options.args = files;
	jshintCli.run(options);
	process.send({
		status:true,
		data:hintResults
	});

	process.exit(0);
