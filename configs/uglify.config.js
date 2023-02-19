var UglifyJS = require('uglify-js');
var package = require('../package.json');
var uglifyConfig = package.uglifyConfig;

var fs = require('fs');
var path = require('path');

var options = {
    mangle: { properties: false },
    compress: { properties: false }
};

var miniopt = {
    mangle: { properties: false },
    compress: { properties: true }
};

var code = {};

let outfile = path.resolve(__dirname, "../" + JSON.stringify(uglifyConfig.output).split('\"').join(''));
let miniout = path.resolve(__dirname, "../" + JSON.stringify(uglifyConfig.miniout).split('\"').join(''));





console.log("\r\n\r\nStarting to merge files...\r\n==========================\r\n");

console.log('File: ' + outfile);
fs.appendFile(outfile, "\r\n", function (err) { if (err) throw err; });

for(let i = 1; i < uglifyConfig.input.length; i++) {
    code[i] = path.resolve(__dirname, "../" + JSON.stringify(uglifyConfig.input[i]).split('\"').join(''))
    console.log('File: ' + code[i]);

    fs.appendFile(
        // Output
        outfile,
        // input
        fs.readFileSync(path.resolve(__dirname, "../" + JSON.stringify(uglifyConfig.input[i]).split('\"').join('')), "utf-8"),
        function (err) {
            if (err) throw err;
        }
    );
    fs.appendFile(outfile, "\r\n", function (err) { if (err) throw err; });
}



console.log("\r\n\r\nStarting to minimize.\r\n");

for(let i = 0; i < uglifyConfig.input.length; i++) {
    var pre = "temp" + i;
    code[i] = fs.readFileSync(path.resolve(__dirname, "../" + JSON.stringify(uglifyConfig.input[i]).split('\"').join('')), "utf-8");
}

fs.writeFileSync(miniout, UglifyJS.minify(code, miniopt).code, "utf8");

console.log("Finished.");
