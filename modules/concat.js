/**
 * Created with JetBrains WebStorm.
 * User: zhengqiguang
 * Date: 13-10-8
 * Time: 下午4:41
 */

var fs = require("fs"),
    path = require("path"),
    mkdirp = require("mkdirp"),
    common = require("../modules/common"),
    foreach = require("foreach"),
    WORKSPACE_PATH = "workspace",
    BUILD_PATH = "build",
    sid = process.argv[2],
    workSpacePath = path.join(WORKSPACE_PATH,sid),
    buildPath = path.join(workSpacePath,BUILD_PATH),
    configPath = path.join(workSpacePath,"package.json"),
    STATUS_CODE = 0;
console.log(configPath);
if(fs.existsSync(configPath) && common.getJsonFromFile(configPath).concat){
    var concatSet = common.getJsonFromFile(configPath).concat;
    foreach(concatSet,function(config){
       var srcSet = config.src,
           dist = config.dist,
           srcText = "";
        foreach(srcSet,function(srcPath){
           srcText += fs.readFileSync(path.join(workSpacePath,srcPath)).toString() + "\r\n";
        });
        var buildPath_ = path.join(buildPath,dist),
            buildPathDirName = path.dirname(buildPath_);
        mkdirp(buildPathDirName,function(){
            fs.writeFile(buildPath_,srcText);
        });
    })
}else{
    STATUS_CODE = 1;//没有配置文件
}

process.send({
    status:STATUS_CODE
})

