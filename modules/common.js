var crypto = require("crypto"),
	fs = require("fs"),
	path = require("path"),
	EasyZip = require("easy-zip").EasyZip,
	zip = new EasyZip(),
	mkdirp = require("mkdirp"),
	rmdir = require("rmdir"),
	sep = path.sep,
	WORKSPACE_PATH = "." + 　sep + "workspace" + sep,
	UPLOAD_PATH = "." + sep + "uploads" + sep,
	parentPath = path.resolve(WORKSPACE_PATH) + sep;
module.exports = {
	/**
	 * 生成随机数
	 * @param  {[type]} digit 位数
	 * @return {[type]}
	 */
	generalRandom: function(digit) {
		return crypto.randomBytes(digit || 10).toString("hex");
	},
	/**
	 * 为每个session生成工作文件夹
	 * @param  {[type]} folderName 文件夹名称
	 * @return {[type]}
	 */
	generalWorkFolder: function(folderName) {
		fs.mkdirSync(parentPath + folderName);
	},
	/**
	 * 删除工作文件夹
	 * @param  {[type]} folderName 文件夹名称
	 * @return {[type]}
	 */
	removeWorkFolder: function(folderName) {
		removeWorkFolderRecursion(folderName, true);
	},
	/**
	 * 清空工作文件夹
	 * @param  {[type]} folderName 文件夹名称
	 * @return {[type]}
	 */
	rebuildWorkFolder: function(folderName,callback) {
		clearWorkFolderRecursion(folderName, false,callback);
	},
	/**
	 * 加载配置文件
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	loadConfig: function(name) {
		var config = require("../config/default_config");
		console.log(config);
	},
	/**
	 * 处理上传文件
	 * @param  {[type]} tempName [uploads文件夹中的文件名]
	 * @param  {[type]} fileName [修改的文件名]
	 * @param  {[type]} userId   [session中的userId]
	 * @return {[type]}          [description]
	 */
	handlerFile: function(tempPath, fileName, userId,res) {
		this.rebuildWorkFolder(userId,function() {
			var fileType = checkExpand(fileName);
			if (fileType === 1) { //多文件文件,解压缩
				unzip(tempPath, userId);
			} else if (fileType === 2) { //单文件,重命名复制
				cpRmToWorkspace(tempPath, fileName, userId);
			} else {
				//return false;
			}
			//return true;
			res.end();
		});
	}
};


/**
 * 清空文件夹
 * @param  {[type]}  path 删除路径
 * @param  {Boolean} isDelParent 是否将目标文件夹删除
 * @return {[type]}
 */

function clearWorkFolderRecursion(folderName, isDelParent, callback) {
	var targetPath = path.join(WORKSPACE_PATH, folderName);
	rmdir(targetPath, function() {
		if (!isDelParent) {
			fs.mkdir(targetPath,function(){
				callback && callback();

			});
		}
	});
}
/**
 * 判断文件后缀名
 * @return {[type]} [1 为 zip包 ，2 为 单文件,0为不合法文件]
 */

function checkExpand(fileName) {
	var expand = fileName.substr(fileName.lastIndexOf(".") + 1).toLowerCase();
	if (expand === "zip") {
		return 1;
	} else if (expand !== "js" && expand !== "css" && expand !== "html") {
		return 0;
	} else {
		return 2;
	}
}


/**
 * 解压上传的zip包
 * @param  {[type]} folderName 工作路径
 * @return {[type]}            [description]
 */

function unzip(zipName, folderName) {
	require("node-zip");
	var zipData_ = fs.readFileSync(zipName, "binary"),
		zipData = new JSZip(zipData_, {
			base64: false,
			checkCRC32: true
		}),
		filenames = Object.getOwnPropertyNames(zipData.files),
		folderName = WORKSPACE_PATH + folderName;
	filenames.forEach(function(filename) {
		if (filename.substr(filename.length - 1) !== "/") {
			var fileObj = zipData.files[filename],
				content = fileObj.data,
				routedName = path.basename(filename);
			if (routedName) {
				var filepath = path.join(folderName, filename),
					fileDir = path.dirname(filepath);
				mkdirp(fileDir, function() {
					fs.writeFile(filepath, content, "binary");
				});
			}
		}
	});
	fs.unlink(zipName);
}
/**
 * 压缩文件,发回http.response 下载
 * @param  {[type]} zipName    压缩zip包名称
 * @param  {[type]} folderName 压缩的目标文件夹
 * @param  {[type]} res        http.response
 * @return {[type]}
 */

function zip(zipName, folderName, res) {
	var tmpPath = WORKSPACE_PATH + 　folderName;
	var zip = new EasyZip();
	zip.zipFolder(tmpPath, function() {
		zip.writeToResponse(res, zipName);
		res.end();
	});
}
/**
 * 复制重命名单文件
 * @param  {[type]}  tempPath   源文件路径
 * @param  {[type]}  rename     重命名名称
 * @param  {[type]}  folderName 目标路径
 * @return {[type]}             [description]
 */

function cpRmToWorkspace(tempPath, rename, folderName) {
	var dspath = path.join(WORKSPACE_PATH, folderName, rename);
	fs.rename(tempPath, dspath);
}