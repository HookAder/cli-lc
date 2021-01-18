"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var prompts_1 = __importDefault(require("prompts"));
var inquirer_1 = __importDefault(require("inquirer"));
var request_1 = __importDefault(require("request"));
var update_notifier_1 = __importDefault(require("update-notifier"));
var index_1 = require("./types/index");
var react_SelectDepend_1 = __importDefault(require("./options/react_SelectDepend"));
var express_SelectDepend_1 = __importDefault(require("./options/express_SelectDepend"));
var inputProjectName_1 = __importDefault(require("./options/inputProjectName"));
var pkg = require('../package.json');
var notifier = update_notifier_1.default({ pkg: pkg });
notifier.notify();
inquirer_1.default
    .prompt([
    {
        type: "list",
        name: "option",
        message: "功能选项",
        choices: [
            index_1.OptionsList.Hello,
            new inquirer_1.default.Separator(),
            index_1.OptionsList.InstallExpressProject,
            new inquirer_1.default.Separator(),
            index_1.OptionsList.InstallReactProject,
        ],
    },
])
    .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(answers.option === index_1.OptionsList.Hello)) return [3 /*break*/, 1];
                console.log(chalk_1.default.red("Hello Welcome to Cli."));
                return [3 /*break*/, 5];
            case 1:
                if (!(answers.option === index_1.OptionsList.InstallExpressProject)) return [3 /*break*/, 4];
                return [4 /*yield*/, prompts_1.default(inputProjectName_1.default)];
            case 2:
                projectName = (_a.sent()).projectName;
                return [4 /*yield*/, express_SelectDepend_1.default(projectName)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                if (answers.option === index_1.OptionsList.InstallReactProject) {
                    // dosomething
                    inquirer_1.default
                        .prompt([
                        {
                            type: "list",
                            name: "type",
                            message: "选项",
                            choices: [
                                index_1.InstallOptions.newProject,
                                new inquirer_1.default.Separator(),
                                index_1.InstallOptions.InstallReactAdminTemplate,
                            ],
                        },
                    ])
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var projectName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(res.type === index_1.InstallOptions.newProject)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, prompts_1.default(inputProjectName_1.default)];
                                case 1:
                                    projectName = (_a.sent()).projectName;
                                    // select dependencies
                                    return [4 /*yield*/, react_SelectDepend_1.default(projectName)];
                                case 2:
                                    // select dependencies
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    if (!(res.type === index_1.InstallOptions.InstallReactAdminTemplate)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, request_1.default("https://github.com/HookAder/react-admin-template/archive/master.zip").pipe(fs_1.default.createWriteStream("master.zip"))];
                                case 4:
                                    _a.sent();
                                    console.log("文件下载中...");
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
