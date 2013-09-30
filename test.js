var pngquantPath = require("pngquant-bin").path,
    cluster = require("cluster"),
    numCpus = require("os").cpus().length,
    execFile = require('child_process').execFile,
    fs = require("fs"),
    path = require("path"),
    file = require("file"),
    common = require("./modules/common"),
    foreach = require("foreach"),
    mkdirp = require("mkdirp"),
    rmdir = require("rmdir");
    WORKSPACE = "workspace/";
var orig_code = "alert(123);";
var UglifyJS = require("uglify-js");

/*var result = UglifyJS.minify("test/options.js",{
    output:"test/options.min.js"
});*/


//console.log(common.getJsonFromFile("test/package.json"));

/*
fs.readFile("test/options.js",function(err,data){
    console.log(data.toString());
   var ast = UglifyJS.parse(data) ;
       ast.figure_out_scope();
    var compressor = UglifyJS.Compressor();
        ast = ast.transform(compressor);
    code = ast.print_to_string();
    console.log(code);

});*/
var regExp = /(\.js$|\.css$)/;
var pathSet = common.getJsonFromFile("test/package.json").src;
var sid = "test/"
//test
WORKSPACE = "";
var workSpacePath = path.join(WORKSPACE,sid) ;

var buildPath = path.join(workSpacePath,"build/");

console.log(buildPath);

fs.exists("test/build",function(exists){
        if(exists){
            rmdir("test/build",function(){
                mkdirp("test/build/",function(){
                    foreach(pathSet,function(value){
                        var rootPath = path.join(workSpacePath,value);
                        fs.readdir(rootPath,function(err,files){
                            if(files.length){
                                for(var i = 0,file;file = files[i];i++){
                                    var filePath = path.join(rootPath,file);
                                    if(fs.statSync(filePath).isFile() && regExp.test(filePath)){
                                        var result = UglifyJS.minify(filePath);
                                        var buildFilePath = path.join(buildPath,value,file),
                                            fileDir = path.dirname(buildFilePath);
                                        mkdirp(fileDir, function() {
                                            fs.writeFile(buildFilePath, result.code);
                                        });
                                    }
                                }
                            }
                        });

                    });

                });
            });
        }else{
            mkdirp("test/build/",function(){
                foreach(pathSet,function(value){
                    var rootPath = path.join(workSpacePath,value);
                    fs.readdir(rootPath,function(err,files){
                        if(files.length){
                            for(var i = 0,file;file = files[i];i++){
                                var filePath = path.join(rootPath,file);
                                if(fs.statSync(filePath).isFile() && regExp.test(filePath)){
                                    var result = UglifyJS.minify(filePath);
                                    var buildFilePath = path.join(buildPath,value,file),
                                        fileDir = path.dirname(buildFilePath);
                                    mkdirp(fileDir, function() {
                                        fs.writeFile(buildFilePath, result.code);
                                    });
                                }
                            }
                        }
                    });

                });

            });
        }
});


var compress = function(){

}
function compress(){

}







/*console.time("a");
var pathArray = [];*/
/*fs.readdir("test/",function(err,files){
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
});*/
/*file.walkSync("test/",function(dir,subDir,files){
    for(var i = 0,file;file = files[i];i ++){
        var path_ = path.join(dir,file);
        pathArray.push(path_);
    }
});*/
/*execFile(pngquantPath,pathArray, function() {
    console.log('Image minified');
    console.timeEnd("a");
});*/
/*
console.log(pathArray);
cluster.setupMaster({
    exec : pngquantPath,
    args : pathArray,
    silent : true
});
cluster.fork();
*/



/*
var doxmate = require("doxmate");
    //fs = require("fs"),
   // path = require("path"),
    //WORKSPACE_PATH = "workspace",
    //sourcePath = path.join(WORKSPACE_PATH,process.argv[2]),
    //targetPath = path.join(__dirname,"../" + sourcePath,"doc");
*//*if(!fs.existsSync(targetPath)){
    fs.mkdirSync(targetPath);
}*//*
doxmate.process("test/test/","test/test/doc","default");
*//*
process.send({
    status:true
});*/
