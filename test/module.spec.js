/**
 * @file 测试模块功能的test case
 * @author  virola <virola.zhu@gmail.com>
 */


var fs = require('fs');
var base = require('./base');
var beautify = require('../lib/beautify');

var outputDir = 'output-files';



describe('module loaded ok', function() {

    // 清空输出文件夹
    base.cleanOutputDir(outputDir);

    var jsFileValid = './input-files/valid.js';

    it('beautify a valid js file, without any options', function() {
        beautify(jsFileValid);

        var outputpath = 'valid.format.js';

        var exists = fs.existsSync(outputpath);

        // 有输出文件
        expect(exists).toBe(true);

        // 内容不一样，说明经过处理
        expect(
            fs.readFileSync(outputpath, 'utf-8') == fs.readFileSync(jsFileValid, 'utf-8')
        ).not.toBe(true);

    });


    // 判断指定参数是否正确执行命令
    it('beautify a valid js file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.js';

        beautify(jsFileValid, {
            indent: 4,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        expect(
            fs.readFileSync(outputFile, 'utf-8') == fs.readFileSync(jsFileValid, 'utf-8')
        ).not.toBe(true);
    });

    var jsFileInvalid = './input-files/invalid.js';

    // js不合法，就不输出文件
    it('beautify an invalid js file', function () {
        var outputFile = outputDir + '/invalid-file.js';
        if (fs.existsSync(outputFile)) {
            fs.remove
        }
        beautify(jsFileInvalid, {
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).not.toBe(true);
    });


    var cssFileValid = './input-files/valid.css';
    var cssFileInvalid = './input-files/invalid.css';


    // 判断指定参数是否正确执行命令
    it('beautify a valid css file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.css';

        beautify(cssFileValid, {
            indent: 4,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        expect(
            fs.readFileSync(outputFile, 'utf-8') == fs.readFileSync(cssFileValid, 'utf-8')
        ).not.toBe(true);
    });

    // CSS不合法，也一样会输出不规范的CSS文件
    it('beautify an invalid css file', function () {
        var outputFile = outputDir + '/invalid-file.css';
        beautify(cssFileInvalid, {
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);
    });

    var htmlFileValid = './input-files/valid.html';
    var htmlFileInvalid = './input-files/invalid.html';

    // 判断指定参数是否正确执行命令
    it('beautify a valid html file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.html';

        // HTML的缩进试试2个空格
        beautify(htmlFileValid, {
            indent: 2,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        expect(
            fs.readFileSync(outputFile, 'utf-8') == fs.readFileSync(htmlFileValid, 'utf-8')
        ).not.toBe(true);
    });

    var jsonFileValid = './input-files/valid.json';
    var jsonFileInvalid = './input-files/invalid.json';

    // 判断指定参数是否正确执行命令
    it('beautify a valid json file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.json';

        beautify(jsonFileValid, {
            indent: 4,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        expect(
            fs.readFileSync(outputFile, 'utf-8') == fs.readFileSync(jsonFileValid, 'utf-8')
        ).not.toBe(true);
    });

    // 不合法，就不输出文件
    it('beautify an invalid json file', function () {
        var outputFile = outputDir + '/invalid-file.json';
        beautify(jsonFileInvalid, {
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).not.toBe(true);
    });

});

