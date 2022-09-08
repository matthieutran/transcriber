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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHTTP = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
function startHTTP(port, hostname, router) {
    return __awaiter(this, void 0, void 0, function* () {
        const koa = new koa_1.default();
        koa.use((0, cors_1.default)({ origin: "*" }));
        koa.use((0, koa_bodyparser_1.default)());
        koa.use(router.routes());
        koa.listen(port, hostname, () => {
            console.log(`HTTP Server running on http://${hostname}:${port}`);
        });
    });
}
exports.startHTTP = startHTTP;
//# sourceMappingURL=koa.js.map