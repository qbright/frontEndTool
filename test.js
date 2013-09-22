var pngquantPath = require("pngquant-bin").path,
    cluster = require("cluster"),
    numCpus = require("os").cpus().length,
    execFile = require('child_process').execFile,
    fs = require("fs"),
    path = require("path");
console.time("a");
var pathArray = [];
fs.readdir("test/",function(err,files){
    for(var i = 0,file;file = files[i];i++){
        var filePath = path.join("test/",file);
        if(fs.statSync(filePath).isFile()){
            pathArray.push(filePath);
        }
    }
    execFile(pngquantPath,pathArray, function() {
        console.log('Image minified');
        console.timeEnd("a");
    });
});



