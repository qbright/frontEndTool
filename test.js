var fs = require("fs"),
    path = require("path"),
    mkdirp = require("mkdirp"),
    configPath = "test/package.json",
    common = require("./modules/common"),
    foreach = require("foreach"),
    WORKSPACE_PATH = "test/",
    BUILD_PATH = "test/build/",
    concatSet = common.getJsonFromFile(configPath).concat ;

foreach(concatSet,function(config){
    var srcSet = config.src,
        dist = config.dist,
        srcText = "";
    foreach(srcSet,function(srcPath){
        srcText += fs.readFileSync(path.join(WORKSPACE_PATH,srcPath)).toString()+ "\r\n";
    })

    var buildPath = path.join(BUILD_PATH,dist),
        a = path.dirname(buildPath);

    console.log(a);
    mkdirp(a,function(){
        fs.writeFile(buildPath,srcText)
    });

});





