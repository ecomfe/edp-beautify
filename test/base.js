/**
 * @file 基础函数封装
 */

var fs = require('fs');

/**
 * 一次获取指定目录下的所有文件
 * 
 * @param {string} root 查询目录
 * 
 * @return {Array} 返回文件路径的数组
 */
function getAllFiles(root) {
    var result = [];
    var files = fs.readdirSync(root);

    files.forEach(function(file) {
        var pathname = root+ "/" + file;
        var stat = fs.lstatSync(pathname);

        if (stat === undefined) {
            return;
        }

        // 不是文件夹就是文件
        if (!stat.isDirectory()) {
            result.push(pathname)
        
        }

        // 递归自身 
        else {
            result = result.concat(getAllFiles(pathname))
        }
    });

    return result;
}

exports.getAllFiles = getAllFiles;

/**
 * 清空输出文件目录
 */
exports.cleanOutputDir = function (dirName) {

    var files = getAllFiles(dirName);

    for (var i = 0, file; file = files[i++]; ) {
        var stat = fs.statSync(file);

        if (stat.isFile()) {
            fs.unlinkSync(file);
        }
    }
};
