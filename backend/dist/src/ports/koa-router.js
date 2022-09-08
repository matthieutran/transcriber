"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const router_1 = __importDefault(require("@koa/router"));
function createRouter() {
    const router = new router_1.default();
    router.get("/", (ctx) => {
        ctx.body = "hello world!";
    });
    return router;
}
exports.createRouter = createRouter;
//# sourceMappingURL=koa-router.js.map