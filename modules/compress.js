/**
 * Created with JetBrains WebStorm.
 * User: qbright
 * Date: 13-9-29
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
var fs = require("fs"),
    path = require("path"),
    file = require("file");
var UglifyJS = require("uglify-js");



var result = UglifyJS.minify("test/options.js",{
    output:"test/options.min.js"
});
console.log(result);
process.send({
    status: true,
    data: hintResults
});
process.exit(0);