require("node-zip");
fs = require("fs"),
path = require("path");





function zip(folderPath,zipName) {
	var zip = new JSZip();
		walk(folderPath,zip);
	var output = zip.generate({base64: false,compression: 'DEFLATE'});
	fs.writeFileSync(zipName, output, 'binary');
}

zip("uploads","./hehehe.zip");

/*
function walk(path, pathLength) {
	var dirList = fs.readdirSync(path);
	if (!pathLength) {
		pathLength = path.length + 1;
	}
	dirList.forEach(function(item) {
		var tempPath = path_.join(path, item);
		if (fs.statSync(tempPath).isDirectory()) {
			folderList.push(tempPath.substr(pathLength));
			walk(tempPath, pathLength);
		} else {
			fileList.push(tempPath.substr(pathLength));
		}
	});
}*/

function walk(folderPath,zip,rootPath,rootPathLength){
	var dirList = fs.readdirSync(folderPath),
		rootPath = rootPath || folderPath;

	if(!rootPathLength){
		rootPathLength = rootPath.length + 1;
	}
	dirList.forEach(function(item){
		var tempPath = path.join(folderPath,item),
			subPath = tempPath.substr(rootPathLength);
		if(fs.statSync(tempPath).isDirectory()){
			zip.folder(subPath);
			walk(tempPath,zip,rootPath,rootPathLength);
		}else{
			var input = fs.readFileSync(path.join(rootPath,subPath),"binary");
			zip.file(subPath,input,{binary:true});
		}
	});
}

/*folderList.forEach(function(folderpath) {
	console.log(folderpath);
	zip.folder(folderpath);
});
fileList.forEach(function(filepath) {
	var input = fs.readFileSync("uploads/" + filepath, 'binary');
	// console.log(filepath);
	zip.file(filepath, input, {
		binary: true
	});
});*/

/*var output = zip.generate({
	base64: false,
	compression: 'DEFLATE'
});
fs.writeFileSync("./testZip.zip", output, 'binary');*/
//console.log(output);