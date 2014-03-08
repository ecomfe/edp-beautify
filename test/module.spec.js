/**
 * @file 测试模块功能的test case
 * @author  virola <virola.zhu@gmail.com>
 */


var fs = require('fs');
var base = require('./base');
var beautify = require('../lib/beautify');

var outputDir = 'output-files';



describe('module loaded ok', function() {

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // 清空输出文件夹
    base.cleanOutputDir(outputDir);

    /**
     * JS test case
     */

    var jsFileValid = './input-files/valid.js';

    it('beautify a valid js file, without any options', function() {
        beautify(jsFileValid);

        var outputpath = 'valid.format.js';

        // 有输出文件
        expect(fs.existsSync(outputpath)).toBe(true);

        var outputText = '' 
            + '// This is just a sample script. Paste your real code (javascript or HTML) here.\n'
            + 'if (\'this_is\' == /an_example/) {\n' 
            + '    of_beautifer();\n' 
            + '} else {\n' 
            + '    var a = b ? c % d : e[f];\n' 
            + '}';

        // 输出内容正确
        expect(fs.readFileSync(outputpath, 'utf-8')).toBe(outputText);

    });


    // 判断指定参数是否正确执行命令
    it('beautify a valid js file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.js';

        // 缩进改为2个的时候
        beautify(jsFileValid, {
            indent: 2,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        var outputText = '' 
            + '// This is just a sample script. Paste your real code (javascript or HTML) here.\n'
            + 'if (\'this_is\' == /an_example/) {\n' 
            + '  of_beautifer();\n' 
            + '} else {\n' 
            + '  var a = b ? c % d : e[f];\n' 
            + '}';

        expect(fs.readFileSync(outputFile, 'utf-8')).toBe(outputText);
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


    /**
     * CSS test case
     */

    var cssFileValid = './input-files/valid.css';


    // 判断指定参数是否正确执行命令
    it('beautify a valid css file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.css';

        beautify(cssFileValid, {
            indent: 2,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        var outputText = '' 
            + 'menu {\n' 
            + '  color: red;\n' 
            + '}\n'
            + '\n'
            + 'navigation {\n' 
            + '  background-color: #333 /* darkgrey */;\n' 
            + '}';

        // 判断输出文件是否正确
        expect(fs.readFileSync(outputFile, 'utf-8')).toBe(outputText);
    });

    // CSS不规范，也一样会输出不规范的CSS文件
    it('beautify an invalid css file', function () {
        var outputFile = outputDir + '/invalid-file.css';
        beautify('./input-files/invalid.css', {
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);
    });


    /**
     * HTML test case
     */

    // 测试缩进和输出内容
    it('beautify a valid html file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.html';

        // HTML的缩进试试2个空格
        beautify('./input-files/valid.html', {
            indent: 2,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        expect(fs.readFileSync(outputFile, 'utf-8'))
            .toBe(fs.readFileSync('input-files/expectTobe.html', 'utf-8'));
    });


    /**
     * JSON test case
     */

    // test content:
    // '{"url":"http://baidu.com","status":0,"investCycle":"\u4e00\u4e2a\u6708\u4ee5\u4e0b"}';

    var jsonFileValid = './input-files/valid.json';

    // 判断指定参数是否正确执行命令
    it('beautify a valid json file, with specific options', function() {
        var outputFile = outputDir + '/specific-name.json';

        beautify(jsonFileValid, {
            indent: 4,
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).toBe(true);

        var outputText = '' 
            + '{\n' 
            + '    "url": "http://baidu.com",\n' 
            + '    "status": 0,\n'
            + '    "investCycle": "一个月以下"\n'
            + '}';

        expect(
            fs.readFileSync(outputFile, 'utf-8')
        ).toBe(outputText);
    });


    var jsonFileInvalid = './input-files/invalid.json';

    // 不合法，就不输出文件
    it('beautify an invalid json file', function () {
        var outputFile = outputDir + '/invalid-file.json';
        beautify(jsonFileInvalid, {
            output: outputFile
        });

        expect(fs.existsSync(outputFile)).not.toBe(true);
    });

});

