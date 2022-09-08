import { Context } from "koa";
import Router from "@koa/router";

export function createRouter(): Router {
  const router: Router = new Router();
  router.get("/", (ctx) => {
    ctx.body = "hello world!";
  });

  const v1Router: Router = createV1Router();
  router.use("/v1", v1Router.routes(), v1Router.allowedMethods());

  return router;
}

export function createV1Router(): Router {
  const router: Router = new Router();
  router.get("/", (ctx: Context) => {
    ctx.body = "v1.0.0";
  });

  router.post("/search", searchPodcasts);

  return router;
}

export function searchPodcasts(ctx: Context) {
  ctx.body = JSON.stringify(ctx.request.body);
  console.log(ctx.request.body);
}
