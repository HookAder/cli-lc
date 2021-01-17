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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionMysql = void 0;
var mysql_1 = __importDefault(require("mysql"));
var chalk_1 = __importDefault(require("chalk"));
var config_1 = require("./config");
// config mysql admin
var connection = mysql_1.default.createConnection(__assign({}, config_1.mysqlConfig));
// Connection to Mysql;
var connectionMysql = function () {
    connection.connect(function (err) {
        if (err) {
            console.log(chalk_1.default.red("[Mysql Error]: " + err));
        }
        // console.log(chalk.yellowBright("[Mysql Status]: SUCCESS"));
    });
};
exports.connectionMysql = connectionMysql;
// default export mysql util;
exports.default = connection;
