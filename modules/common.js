var crypto = require("crypto"),
	fs = require("fs"),
	path = require("path"),
	mkdirp = require("mkdirp"),
	rmdir = require("rmdir"),
	child_process = require("child_process"),
	sep = path.sep,
	WORKSPACE_PATH = "workspace";
require("node-zip");
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
		var workFolder = path.join(WORKSPACE_PATH, folderName);
		fs.mkdirSync(workFolder);
	},
	/**
	 * 删除工作文件夹
	 * @param  {[type]} folderName 文件夹名称
	 * @return {[type]}
	 */
	removeWorkFolder: function(folderName) {
		clearWorkFolderRecursion(folderName, true);
	},
	/**
	 * 清空工作文件夹
	 * @param  {[type]} folderName 文件夹名称
	 * @return {[type]}
	 */
	rebuildWorkFolder: function(folderName, callback) {
		clearWorkFolderRecursion(folderName, false, callback);
	},
	/**
	 * 加载配置文件
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	loadConfig: function(name) {
		if (name) {
			var config = require("../config/default_config");
			return config[name] || {};
		}
	},
	/**
	 * 处理上传文件
	 * @param  {[type]} tempName [uploads文件夹中的文件名]
	 * @param  {[type]} fileName [修改的文件名]
	 * @param  {[type]} userId   [session中的userId]
	 * @return {[type]}          [description]
	 */
	handlerFile: function(tempPath, fileName, userId, res) {
		this.rebuildWorkFolder(userId, function() {
			var fileType = checkExpand(fileName);
			if (fileType === 1) { //多文件文件,解压缩
				unzip(tempPath, userId);
			} else if (fileType === 2) { //单文件,重命名复制
				cpRmToWorkspace(tempPath, fileName, userId);
			} else {
				//return false;
			}
			res.end();
		});
	},
	/**
	 * 将工作路径下的文件打包发送到http响应中
	 * @param  {[type]} workspace  工作文件夹
	 * @param  {[type]} zipName    压缩包名称
	 * @param  {[type]} res        http.Reponse
	 * @return {[type]}           [description]
	 */
	writeZipToResponse: function(workspace, zipName, res) {
		var zip = new JSZip(),
			folderPath = path.join(WORKSPACE_PATH, workspace);
		zipName = zipName.substr(zipName.lastIndexOf(".") + 1) == "zip" ? zipName : zipName + ".zip";
		zipRecursion(folderPath, zip);
		res.setHeader('Content-Disposition', 'attachment; filename="' + zipName + '"');
		res.write(zip.generate({
			base64: false,
			compression: 'STORE'//不进行压缩，只做打包，不然一些特殊文件压缩后会报错
		}), "binary");
		res.end();
	},
	/**
	 * 创建子进程执行cpu密集型操作
	 * @param  {[type]}   module  执行的模块路径
	 * @param  {array}   args    执行时参数
	 * @param  {Function} cb      callback
	 * @return {[type]}          [description]
	 */
	swapCP: function(module, args, cb) {
		var cP = child_process.fork(module, args);
		cP.on("message", function(result) {
			cb && cb(result);
		})

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
			fs.mkdir(targetPath, function() {
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
 * @param  {[type]} zipName    源文件路径
 * @param  {[type]} folderName 工作路径
 * @return {[type]}            [description]
 */

function unzip(zipName, folderName) {
	var zipData_ = fs.readFileSync(zipName, "binary"),
		zipData = new JSZip(zipData_, {
			base64: false,
			checkCRC32: true
		}),
		filenames = Object.getOwnPropertyNames(zipData.files),
		folderName = path.join(WORKSPACE_PATH, folderName);
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
 * 递归遍历目标路径下的文件，构建zip包
 * @param  {[type]} folderPath      目标路径
 * @param  {[type]} zip           	JSZip 对象
 * @param  {[type]} rootPath      	根路径,用于递归中使用，调用时不要传入
 * @param  {[type]} rootPathLength 	根路径长度,用于递归中使用，调用时不要传入
 * @return {[type]}
 */

function zipRecursion(folderPath, zip, rootPath, rootPathLength) {
	var dirList = fs.readdirSync(folderPath),
		rootPath = rootPath || folderPath;
	if (!rootPathLength) {
		rootPathLength = rootPath.length + 1;
	}
	dirList.forEach(function(item) {
		var tempPath = path.join(folderPath, item),
			subPath = tempPath.substr(rootPathLength);
		if (fs.statSync(tempPath).isDirectory()) {
			zip.folder(subPath);
			zipRecursion(tempPath, zip, rootPath, rootPathLength);
		} else {
			var input = fs.readFileSync(path.join(rootPath, subPath),"binary");
			zip.file(subPath, input, {
				binary: true
			});
		}
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