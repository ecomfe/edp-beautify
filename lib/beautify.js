/**
 * @file 美化JS、CSS和JSON文件命令
 * @author virola(virola.zhu@gmail.com)
 */

var fs = require('fs');
var path = require('path');
var edp = require( 'edp-core' );

/**
 * 格式化文件的函数
 * 
 * @param {string} sourceFile 输入文件名
 * @param {Object} options 美化选项参数
 * @return {string} 格式化后的字符串
 */
function beautify(sourceFile, options) {
    options = options || {};

    var extname = path.extname(sourceFile);
    var fileType = extname.slice(1);

    // 如果没有指定文件类型，那么就根据后缀名判断
    options.fileType = options.fileType || fileType;

    var data = fs.readFileSync(sourceFile, 'utf-8');

    var output = '';

    try {

        switch(options.fileType) {
            case 'htm':
            case 'html':
                output = require('./beautify-html.js')(data, options);
                break;
            case 'json':
                output = JSON.stringify(JSON.parse(data), null, (options.indent || 4));
                break;
            case 'js':
                output = require('./beautify-js.js')(data, options);
                break;
            case 'css':
                output = require('./beautify-css.js')(data, options);
                break;
            default:
                edp.log.warn('暂不支持该类型文件的格式化');
                return;
        }
    }
    catch ( err ) {
        edp.log.error('文件解析错误: [' + sourceFile + ']');
        return;
    }


    var outputFile = options.output;

    // 如果没有指定输出文件，那么自动生成<filename>.format.<fileType>文件
    if (!outputFile) {
        var fileInfo = path.basename(sourceFile).split('.');
        outputFile = fileInfo[0] + '.format' + extname;
        
    }

    // 将内容写入输出文件
    fs.writeFileSync(outputFile, output, 'UTF-8');
    edp.log.info('Success beautify file [' + sourceFile + '] to [' + outputFile + ']');
}


module.exports = beautify;
