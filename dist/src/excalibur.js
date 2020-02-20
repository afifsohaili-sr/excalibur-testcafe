"use strict";
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
    return Excalibur;
}());
exports.Excalibur = Excalibur;
