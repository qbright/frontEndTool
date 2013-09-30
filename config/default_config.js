hintOption = {
	verbose: true,
	extensions: ""
}
hintDefaultConfig = {
	"curly": true,
	"eqeqeq": true,
	"bitwise":false,
	"immed": true,
	"latedef": true,
	"forin":false,
	"immed":false,
	"newcap": true,
	"noarg": true,
	"sub": true,
	"plusplus":false,
	"undef": true,
	"boss": true,
	"eqnull": true,
	"node": true,
	"jquery":false,
	"camelcase":false
}



compressDefaultConfig = {
    "sequences":false,
        "properties":false,
        "dead_code":false,
        "drop_debugger":false,
        "unsafe":false,
        "conditionals":false,
        "comparisons":false,
        "evaluate":false,
        "booleans":false,
        "loops":false,
        "unused":false,
        "hoist_funs":false,
        "hoist_vars":false,
        "if_return":false,
        "join_vars":false,
        "cascade":false,
        "warnings":false
}

exports.hintOption = hintOption;
exports.hintDefaultConfig = hintDefaultConfig;
exports.compressDefaultConfig = compressDefaultConfig;