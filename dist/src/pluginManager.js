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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var form_data_1 = __importDefault(require("form-data"));
var path_1 = __importDefault(require("path"));
var PluginManager = /** @class */ (function () {
    function PluginManager(excalibur) {
        this.excalibur = excalibur;
    }
    PluginManager.prototype.getUpmToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pluginApiUrl, headers, upmToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.upmToken) {
                            return [2 /*return*/, this.upmToken];
                        }
                        pluginApiUrl = '/rest/plugins/1.0/';
                        return [4 /*yield*/, this.excalibur.getHttpService().get(pluginApiUrl, { headers: { 'Content-Type': 'application/json' } })];
                    case 1:
                        headers = (_a.sent()).headers;
                        upmToken = headers['upm-token'] || '';
                        this.upmToken = upmToken;
                        return [2 /*return*/, upmToken];
                }
            });
        });
    };
    PluginManager.prototype.install = function (obrPath) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var token, pluginInstallUrl, formData, installResponse, timeElapsed_1, pluginStatusCheckUrl_1, pluginStatusCheckInterval_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getUpmToken()];
                    case 1:
                        token = _a.sent();
                        pluginInstallUrl = '/rest/plugins/1.0/';
                        formData = new form_data_1.default();
                        formData.append('plugin', fs.createReadStream(path_1.default.resolve(obrPath)));
                        return [4 /*yield*/, this.excalibur.getHttpService().post(pluginInstallUrl, formData, {
                                headers: __assign({ 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' }, formData.getHeaders()),
                                params: { token: token }
                            })];
                    case 2:
                        installResponse = (_a.sent()).data;
                        timeElapsed_1 = 0;
                        pluginStatusCheckUrl_1 = installResponse.links.self;
                        pluginStatusCheckInterval_1 = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var pluginStatusCheckResponse, isEnabled;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        timeElapsed_1 = timeElapsed_1 + 1;
                                        console.info("Installing plugin... (Time elapsed: " + timeElapsed_1 + " seconds)");
                                        return [4 /*yield*/, this.excalibur.getHttpService().get(pluginStatusCheckUrl_1)];
                                    case 1:
                                        pluginStatusCheckResponse = _b.sent();
                                        isEnabled = ((_a = pluginStatusCheckResponse.data) === null || _a === void 0 ? void 0 : _a.enabled) || false;
                                        if (isEnabled) {
                                            clearInterval(pluginStatusCheckInterval_1);
                                            console.info("Plugin " + pluginStatusCheckResponse.data.key + " successfully installed!");
                                            resolve();
                                        }
                                        if (timeElapsed_1 > 30) {
                                            clearInterval(pluginStatusCheckInterval_1);
                                            reject(new Error('Timeout! Takes more than 30 seconds to install'));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 1000);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        reject(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return PluginManager;
}());
exports.PluginManager = PluginManager;
