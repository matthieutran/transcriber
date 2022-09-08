import Router from "@koa/router";

export function createRouter(): Router {
  const router: Router = new Router();
  router.get("/", (ctx) => {
    ctx.body = "hello world!";
  });

  return router;
}
