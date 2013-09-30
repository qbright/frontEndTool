/**
 * Created with JetBrains WebStorm.
 * User: qbright
 * Date: 13-9-29
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */


var fs = require("fs"),
    path = require("path"),
    file = require("file"),
    common = require("../modules/common"),
    foreach = require("foreach"),
    mkdirp = require("mkdirp"),
    cleanCSS = require("clean-css"),
    UglifyJS = require("uglify-js"),
    jsRegExp = /\.js$/,
    cssRegExp = /\.css$/,
    WORKSPACE_PATH = "workspace",
    BUILD_PATH = "build",
    STATUS_CODE = 0,
    sid = process.argv[2],
    workSpacePath = path.join(WORKSPACE_PATH,sid),
    buildPath = path.join(workSpacePath,BUILD_PATH),
    configPath = path.join(workSpacePath,"package.json"),
    config = JSON.parse(process.argv[3]);
if(fs.existsSync(configPath) && common.getJsonFromFile(configPath).minSrc){
    var pathSet = common.getJsonFromFile(configPath).minSrc;
    if(!fs.existsSync(buildPath)){//如果没有build文件夹
        fs.mkdirSync(buildPath);
    }

    if(pathSet.length){
        foreach(pathSet,function(path_){
            if(path_ != "/") {
                var walkPath = path.join(workSpacePath,path_);
                file.walkSync(walkPath,function(dirPath,dirs,files){
                    foreach(files,function(fileName){
                        if(jsRegExp.test(fileName))  {
                            miniJs(path.join(dirPath,fileName),workSpacePath,buildPath);
                        }else if(cssRegExp.test(fileName)){
                            miniCss(path.join(dirPath,fileName),workSpacePath,buildPath);
                        }
                    });
                });
            }
        });
    }

    var rootPath = fs.readdirSync(workSpacePath);
    foreach(rootPath,function(path_){
        if(jsRegExp.test(path_)) {
            miniJs(path.join(workSpacePath,path_),workSpacePath,buildPath);
        }else if(cssRegExp.test(path_)){
            miniCss(path.join(workSpacePath,path_),workSpacePath,buildPath);
        }
    });

}else {
    STATUS_CODE = 1 //没有package.json 配置文件
}

process.send({
    status:STATUS_CODE
});

function miniJs(fileName,workSpacePath,buildPath){
    var buildFilePath = fileName.replace(workSpacePath,buildPath),
        result = UglifyJS.minify(fileName,{
            compress:config
        }),
        buildPathDir = path.dirname(buildFilePath);
        mkdirp(buildPathDir,function(){
           try{
               fs.writeFile(buildFilePath,result.code.toString());
           }catch(e){
               STATUS_CODE = 2 //压缩失败
           }

        });
}

function miniCss(fileName,workSpacePath,buildPath){
   var buildFilePath = fileName.replace(workSpacePath,buildPath),
       buildPathDir = path.dirname(buildFilePath);

    try{
        fs.readFile(fileName,function(err,data){
            var minized = cleanCSS.process(data.toString()) ;
            mkdirp(buildPathDir,function(){
                fs.writeFile(buildFilePath,minized);
            });
        })
    }catch(e){
        STATUS_CODE = 2;
    }

}

