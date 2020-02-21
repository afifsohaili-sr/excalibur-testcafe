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
var axios_1 = __importDefault(require("axios"));
var Excalibur = /** @class */ (function () {
    function Excalibur(_a) {
        var _b = _a.confluenceUrl, confluenceUrl = _b === void 0 ? 'localhost:8090' : _b, _c = _a.confluenceUrlPrefix, confluenceUrlPrefix = _c === void 0 ? '' : _c, _d = _a.password, password = _d === void 0 ? 'admin' : _d, _e = _a.username, username = _e === void 0 ? 'admin' : _e;
        this.confluenceUrl = confluenceUrl;
        this.confluenceUrlPrefix = confluenceUrlPrefix;
        this.password = password;
        this.username = username;
    }
    Excalibur.prototype.getHttpService = function () {
        if (this.httpService) {
            return this.httpService;
        }
        var httpService = axios_1.default.create({
            baseURL: "http://" + this.confluenceUrl + this.confluenceUrlPrefix,
            auth: {
                username: this.username,
                password: this.password
            }
        });
        this.httpService = httpService;
        return httpService;
    };
    Excalibur.prototype.waitForConfluenceBoot = function (timeout) {
        if (timeout === void 0) { timeout = 180; }
        return __awaiter(this, void 0, void 0, function () {
            var secondsElapsed;
            var _this = this;
            return __generator(this, function (_a) {
                secondsElapsed = 0;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.getHttpService().get('/', { timeout: 1000 })];
                                    case 1:
                                        _a.sent();
                                        clearInterval(interval);
                                        resolve();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_1 = _a.sent();
                                        console.log('Waiting for Confluence to start...');
                                        secondsElapsed = secondsElapsed + 1;
                                        if (secondsElapsed > timeout / 5) {
                                            clearInterval(interval);
                                            console.log("Confluence did not start after " + timeout + " seconds...");
                                            reject();
                                        }
                                        console.error(err_1.message);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, 5000);
                    })];
            });
        });
    };
    return Excalibur;
}());
exports.Excalibur = Excalibur;
