require("node-zip");
fs = require("fs"),
fileList = [],
folderList = [],
zip = new JSZip(),
path_ = require("path");

function walk(path,pathLength){
	var dirList = fs.readdirSync(path);
	if(!pathLength){
		pathLength = path.length + 1;
	}
	dirList.forEach(function(item){
			var tempPath = path_.join(path,item);
		if(fs.statSync(tempPath).isDirectory()){
			folderList.push(tempPath.substr(pathLength));
			walk(tempPath,pathLength);
		}else{
			fileList.push(tempPath.substr(pathLength));
		}
	});
}
walk('uploads');
console.log(folderList);
console.log(fileList);
folderList.forEach(function (folderpath) {
      //console.log(folderpath);
        //zip.folder(folderpath);
    });
fileList.forEach(function (filepath) {
      //var input = fs.readFileSync(filepath, 'binary');
     // console.log(filepath);
        //zip.file(filepath, input, {binary: true});
    });

//var output = zip.generate({base64: false, compression: 'DEFLATE'});
//fs.writeFileSync("./testZip.zip", output, 'binary');
//console.log(output);

