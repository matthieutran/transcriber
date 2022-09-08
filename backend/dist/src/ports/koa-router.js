"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPodcasts = exports.createV1Router = exports.createRouter = void 0;
const router_1 = __importDefault(require("@koa/router"));
function createRouter() {
    const router = new router_1.default();
    router.get("/", (ctx) => {
        ctx.body = "hello world!";
    });
    const v1Router = createV1Router();
    router.use("/v1", v1Router.routes(), v1Router.allowedMethods());
    return router;
}
exports.createRouter = createRouter;
function createV1Router() {
    const router = new router_1.default();
    router.get("/", (ctx) => {
        ctx.body = "v1.0.0";
    });
    router.post("/search", searchPodcasts);
    return router;
}
exports.createV1Router = createV1Router;
function searchPodcasts(ctx) {
    ctx.body = JSON.stringify(ctx.request.body);
    console.log(ctx.request.body);
}
exports.searchPodcasts = searchPodcasts;
//# sourceMappingURL=koa-router.js.map