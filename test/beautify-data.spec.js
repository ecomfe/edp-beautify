/**
 * @file 测试具体工具的代码格式化
 * @author  virola <virola.zhu@gmail.com>
 */

// 测试JS的内容
var jsBeautify = require('../lib/beautify-js');

describe('beautify-js test case', function() {
    
    it('beautify js content', function () {
        var testText = 'if (\'this_is\'==/an_example/){of_beautifer();}else{var a=b?(c%d):e[f];}';
        var outputText = '' 
            + 'if (\'this_is\' == /an_example/) {\n' 
            + '    of_beautifer();\n' 
            + '} else {\n' 
            + '    var a = b ? c % d : e[f];\n' 
            + '}';

        var data = jsBeautify(testText);
        expect(data).toBe(outputText);
    });

});

// 测试CSS的内容
var cssBeautify = require('../lib/beautify-css');

describe('beautify-css test case', function () {
    var testText = 'menu{color:red} navigation{background-color:#333 /* darkgrey */}';
    var outputText = '' 
        + 'menu {\n' 
        + '    color: red;\n' 
        + '}\n'
        + '\n'
        + 'navigation {\n' 
        + '    background-color: #333 /* darkgrey */;\n' 
        + '}';

    expect(cssBeautify(testText)).toBe(outputText);
});


