"use strict";
exports.__esModule = true;
exports.write_file = exports.read_file = void 0;
var fs = require("fs");
var read_file = function (file_name) {
    return JSON.parse(fs.readFileSync("./module/".concat(file_name), 'utf-8'));
};
exports.read_file = read_file;
var write_file = function (file_name, data) {
    fs.writeFileSync("./module/".concat(file_name), JSON.stringify(data, null, 4));
};
exports.write_file = write_file;
