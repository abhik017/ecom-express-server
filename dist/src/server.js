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
exports.Server = void 0;
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
var http = require("http");
// import https = require("https");
var bodyParser = require("body-parser");
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
var Server = /** @class */ (function () {
    function Server(routes, port) {
        if (port === void 0) { port = 8080; }
        this.HTTP_PORT = 8080;
        // private static readonly HTTPS_PORT = 8081;
        this.corsOption = {
            origin: false,
            methods: ["GET", "PUT", "POST", "PATCH", "HEAD", "DELETE"]
        };
        this.routes = routes;
        this.HTTP_PORT = port;
    }
    Server.prototype.initializeServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app;
            var _this = this;
            return __generator(this, function (_a) {
                app = express();
                // created express app
                // Helmet can help protect your app from some well-known web vulnerabilities
                app.use(helmet());
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(bodyParser.json());
                app.use(bodyParser.text());
                app.use(cors(this.corsOption));
                this.routes(app);
                // Initialized routes
                Server.httpServer = http.createServer(app);
                // Server.httpsServer = https.createServer(options, app);
                Server.httpServer.listen(this.HTTP_PORT, function () { return console.log("Server is running on port " + _this.HTTP_PORT); });
                // Server.httpServer.listen(Server.HTTPS_PORT);
                mongoose_1.default.connect(Server.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
                    .then(function () { return console.log("MongoDB connected successfully"); })
                    .catch(function (err) { return console.log(err.message); });
                mongoose_1.default.set('useFindAndModify', false);
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.launchServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initializeServer()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.closeServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (Server.httpServer !== undefined) {
                    Server.httpServer.close();
                }
                return [2 /*return*/];
            });
        });
    };
    Server.dbUrl = process.env.MONGODB_CONNECT;
    return Server;
}());
exports.Server = Server;
console.log(process.env.MONGODB_CONNECT);
//# sourceMappingURL=server.js.map