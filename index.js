/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 /**
  * @file edp-beautify入口处理程序
  * @author  virola <virola.zhu@gmail.com>
  */

var path = require('path');
var fs = require('fs');

var edp = require( 'edp-core' );

exports.process = function (args, opts) {

    var filename = args[0];

    if (!filename) {
        edp.log.error('请输入要格式化的文件名');
        return;
    }

    if (!fs.existsSync(filename)) {
        edp.log.error('未找到文件: [' + filename + ']');
        return;
    }

    var options = {
        fileType: opts.type,  // 指定文件类型
        indent: parseInt(opts.indent),  // 空格缩进个数
        output: opts.o        // 输出文件
    };

    // 参数输入容错
    if (isNaN(options.indent)) {
        options.indent = 4;
    }

    require('./lib/beautify.js')(filename, options);

};

