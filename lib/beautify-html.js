/**
 * @file 格式化HTML代码模块
 * @author  virola <virola.zhu@gmail.com>
 */

var fs = require('fs');

/**
 * 格式化HTML代码
 * 
 * @param {string} sourceCode 要格式化的HTML代码
 * @param {Object} params 格式化选项
 * @param {number} params.indent 空格缩进个数
 * 
 * @return {string} 格式化后的HTML代码
 */
function beautifyHtml(sourceCode, params) {
    var formatHtml = require('js-beautify').html;
    var options = {
      'indent_inner_html': false,
      'indent_size': params.indent || 4,
      'indent_char': ' ',
      'wrap_line_length': 120,
      'brace_style': 'end-expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 1,
      'indent_handlebars': false
    };

    // 读取当前目录下的'.jsbeautifyrc'配置文件
    var conf = process.cwd() + '/.htmlbeautifyrc';
    if ( fs.existsSync( conf ) ) {
        var rcBuffer = fs.readFileSync( conf );
        conf = JSON.parse( rcBuffer.toString( 'UTF-8' ) );

        for ( var key in conf ) {
            options[key] = conf[key];
        }
    }

    return formatHtml(
        sourceCode,
        options
    );
}

module.exports = beautifyHtml;
