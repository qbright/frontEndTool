/**
 * Created with JetBrains WebStorm.
 * User: zhengqiguang
 * Date: 13-10-18
 * Time: 上午9:45
 * To change this template use File | Settings | File Templates.
 */

var doxmate = require("doxmate"),
    fs = require("fs"),
    path = require("path"),
    WORKSPACE_PATH = "workspace",
    setting = JSON.parse(process.argv[3]),
    sourcePath = path.join(WORKSPACE_PATH,process.argv[2]),
    doctargetPath = path.join(__dirname,"../" + sourcePath,"doc"),
    common = require("../modules/common"),
    mkdirp  = require("mkdirp"),
    foreach = require("foreach"),
    UglifyJS = require("uglify-js"),
    cleanCSS = require("clean-css"),
    jsRegExp = /\.js$/,
    cssRegExp = /\.css$/,
    BUILD_PATH = "build",
    sid = process.argv[2],
    workSpacePath = path.join(WORKSPACE_PATH,sid),
    buildPath = path.join(workSpacePath,BUILD_PATH),
    configPath = path.join(workSpacePath,"package.json");

    STATUS_CODE = 0;
if(setting.doc){//文档
    try{
        if(!fs.existsSync(doctargetPath)){
            fs.mkdirSync(doctargetPath);
        }
        doxmate.process(sourcePath,doctargetPath,"default");
    }catch(e){
       STATUS_CODE = 1;
    }
}

if(setting.compress && !setting.concat){//压缩不合并
        common.swapCP("./modules/compress",[process.argv[2],"{}"],function(result){
            process.send({
                status:result.status
            });
        });
}else if(!setting.compress && setting.concat){//合并不压缩
    common.swapCP("./modules/concat",[process.argv[2]],function(result){
        process.send({
            status:result.status
        });
    });
}else{//压缩又合并
    if(fs.existsSync(configPath) && common.getJsonFromFile(configPath).concat){
        var concatSet = common.getJsonFromFile(configPath).concat;
        foreach(concatSet,function(config){
            var srcSet = config.src,
                dist = config.dist,
                srcText = "";
            foreach(srcSet,function(srcPath){
                if(jsRegExp.test(srcPath)){
                    srcText += minJs(path.join(workSpacePath,srcPath)) + "\r\n\r\n";
                }else if(cssRegExp.test(srcPath)){
                    srcText += minCss(path.join(workSpacePath,srcPath)) + "\r\n\r\n";
                }
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
    });
}


function minJs(fileName){
    var result =  UglifyJS.minify(fileName);

    return result.code.toString();
}

function minCss(fileName){
   var result =  fs.readFileSync(fileName);
    result = cleanCSS.process(result.toString());
    return result;
}