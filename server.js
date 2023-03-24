"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var http = require("http");
var fs_api_1 = require("./fs_api");
var uuid_1 = require("uuid");
var PORT = 2000;
var userApp = http.createServer(function (req, res) {
    var _a;
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    var userId = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/')[2];
    if (req.method === 'GET') {
        if (req.url === '/users') {
            var users = (0, fs_api_1.read_file)('users.json');
            res.end(JSON.stringify(users));
        }
        if (req.url === "/users/".concat(userId)) {
            var oneUser = (0, fs_api_1.read_file)('users.json').find(function (u) { return u.id === userId; });
            if (!oneUser) {
                return res.end('User not found!');
            }
            res.end(JSON.stringify(oneUser));
        }
    }
    if (req.method === 'POST') {
        if (req.url === '/users') {
            req.on('data', function (chunk) {
                var users = (0, fs_api_1.read_file)('users.json');
                var newUser = JSON.parse(chunk.toString());
                users.push(__assign({ id: (0, uuid_1.v4)() }, newUser));
                (0, fs_api_1.write_file)('users.json', users);
                res.end(JSON.stringify('OK'));
            });
        }
    }
    if (req.method === 'DELETE') {
        if (req.url === "/users/".concat(userId)) {
            var users_1 = (0, fs_api_1.read_file)('users.json');
            var getOne = users_1.find(function (u) { return u.id === userId; });
            if (!getOne) {
                return res.end('users not found!');
            }
            users_1.forEach(function (u, idx) {
                if (u.id === userId) {
                    users_1.splice(idx, 1);
                }
            });
            (0, fs_api_1.write_file)('users.json', users_1);
            res.end('Deleted users!');
        }
    }
    if (req.method === 'PUT') {
        if (req.url === "/users/".concat(userId)) {
            req.on('data', function (chunk) {
                var updateUser = JSON.parse(chunk.toString());
                var users = (0, fs_api_1.read_file)('users.json');
                var getOne = users.find(function (f) { return f.id === userId; });
                if (!getOne) {
                    return res.end('users not found!');
                }
                users.forEach(function (user) {
                    if (user.id === userId) {
                        user.name = updateUser.name;
                        user.username = updateUser.username;
                        user.email = updateUser.email;
                    }
                });
                (0, fs_api_1.write_file)('users.json', users);
                res.end('Updated users!');
            });
        }
    }
});
userApp.listen(PORT, function () {
    console.log("server running ".concat(PORT));
});
