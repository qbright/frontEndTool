/*var jshintcli = require("jshint/src/cli");
cliOptions = {
	verbose:true,
	extensions:"",
	args:["./testHint"],
	reporter:function(results,data){
		console.log(results);
		console.log(data);
	},
	config:{
		 "curly": true,
		  "eqeqeq": true,
		  "immed": true,
		  "latedef": true,
		  "newcap": true,
		  "noarg": true,
		  "sub": true,
		  "undef": true,
		  "boss": true,
		  "eqnull": true,
		  "node": true
	}
}
jshintcli.run(cliOptions);*/
var hint = require("./modules/hint"),
child_process = require("child_process");
var n = child_process.fork("./modules/hint");
n.send("heeeeeeelllll");
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});