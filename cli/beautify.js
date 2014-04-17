/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令选项信息
 *
 * @type {Array}
 */
cli.options = [ 'output:', 'indent:', 'type:' ];

/**
 * @const
 * @type {string}
 */
cli.description = '输出格式化的css、js和html。';

/**
 * @param {Array.<string>} args 命令行参数.
 * @param {Object.<string, string>} opts 命令的可选参数.
 */
cli.main = function( args, opts ) {
    require('../index').process( args, opts );
};

exports.cli = cli;
