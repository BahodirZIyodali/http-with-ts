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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("http");
var uuid = require("uuid");
var bcrypt = require("bcryptjs");
var fs = require("fs");
var read_file = function (file_name) {
    return JSON.parse(fs.readFileSync("./module/".concat(file_name), 'utf-8'));
};
var write_file = function (file_name, data) {
    fs.writeFileSync("./module/".concat(file_name), JSON.stringify(data, null, 4));
};
var app = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
    var course_id = req.url.split("/")[2];
    if (req.method === "GET") {
        if (req.url === "/list") {
            var loggedUserId_1 = req.headers.headers;
            console.log(loggedUserId_1);
            var courses = read_file("courses.json").filter(function (course) { return course.userId === loggedUserId_1; });
            res.end(JSON.stringify(courses));
        }
        if (req.url === "/list/".concat(course_id)) {
            var oneCourse = read_file("courses.json").find(function (course) { return course.id === course_id; });
            if (!oneCourse)
                return res.end("Course not found!");
            res.end(JSON.stringify(oneCourse));
        }
    }
    if (req.method === "POST") {
        if (req.url === "/create") {
            req.on("data", function (chunk) {
                var courses = read_file("courses.json");
                var new_course = JSON.parse(chunk.toString());
                courses.push(__assign({ id: uuid.v4() }, new_course));
                write_file("courses.json", courses);
                res.end(JSON.stringify("OK"));
            });
        }
        if (req.url === "/register") {
            req.on("data", function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, username, email, password, users, foundedUser, hashedPsw;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = JSON.parse(chunk.toString()), username = _a.username, email = _a.email, password = _a.password;
                            users = read_file("users.json");
                            foundedUser = users.find(function (u) { return u.email === email; });
                            if (foundedUser)
                                return [2 /*return*/, res.end(JSON.stringify({
                                        msg: "Email already exists!!!"
                                    }))];
                            return [4 /*yield*/, bcrypt.hash(password, 12)];
                        case 1:
                            hashedPsw = _b.sent();
                            users.push({
                                id: uuid.v4(),
                                username: username,
                                email: email,
                                password: hashedPsw
                            });
                            write_file("users.json", users);
                            res.end(JSON.stringify({
                                msg: "Registrated!"
                            }));
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        if (req.url === "/login") {
            req.on("data", function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, suppername, password, users, foundedUser, isLogged;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = JSON.parse(chunk.toString()), suppername = _a.suppername, password = _a.password;
                            users = read_file("users.json");
                            foundedUser = users.find(function (user) { return user.username === suppername || user.email === suppername; });
                            if (!foundedUser)
                                return [2 /*return*/, res.end(JSON.stringify({
                                        msg: "User not found!"
                                    }))];
                            return [4 /*yield*/, bcrypt.compare(password, foundedUser.password)];
                        case 1:
                            isLogged = _b.sent();
                            if (!isLogged)
                                return [2 /*return*/, res.end(JSON.stringify({
                                        msg: "Password xato!"
                                    }))];
                            delete foundedUser.password;
                            res.end(JSON.stringify({
                                msg: "Logged",
                                data: foundedUser
                            }));
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    }
    if (req.method === "DELETE") {
        if (req.url === "/courses/".concat(course_id)) {
            var courses = read_file("courses.json");
            var updated_courses = courses.filter(function (course) { return course.id !== course_id; });
            write_file("courses.json", updated_courses);
            res.end(JSON.stringify("OK"));
        }
    }
    if (req.method === "PUT") {
        if (req.url === "/courses/".concat(course_id)) {
            req.on("data", function (chunk) {
                var courses = read_file("courses.json");
                var updated_course = JSON.parse(chunk.toString());
                courses = courses.map(function (course) {
                    if (course.id === course_id) {
                        return __assign(__assign(__assign({}, course), updated_course), { id: course_id });
                    }
                    return course;
                });
                write_file("courses.json", courses);
                res.end(JSON.stringify("OK"));
            });
        }
    }
});
app.listen(2000, function () {
    console.log("server running 2000");
});
