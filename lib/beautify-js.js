/**
 * @file JS格式化模块
 * @author  virola <virola.zhu@gmail.com>
 */

// TODO: when formatting js with comments, no blank line generated before 
//       comments, but escodegen doesn't support that at the moment.  


/**
 * 格式化JS代码
 * 
 * @param {string} sourceCode 要格式化的JS代码
 * @param {Object} params 格式化选项
 * @param {number} params.indent 空格缩进个数
 * 
 * @return {string} 格式化后的JS代码
 */
function beautifyJs(sourceCode, params) {

    // 语法树分析模块
    var ast = require('esprima').parse(sourceCode, {
        range: true,
        comment: true,
        tokens: true
    });

    // 代码生成模块
    var escodegen = require('escodegen');
    escodegen.attachComments(ast, ast.comments, ast.tokens);

    var indent = params.indent || 4;


    return escodegen.generate(ast, {
        comment: true,
        format: {
            indent: {
                style: (new Array(indent + 1)).join(' ')
            },
            escapeless: true
        } 
    });
}

module.exports = beautifyJs;

