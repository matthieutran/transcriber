import Koa from "koa";
import cors from "@koa/cors";
import Router from "@koa/router";

export async function startHTTP(
  port: number,
  hostname: string,
  router: Router
) {
  const koa = new Koa();

  koa.use(cors({ origin: "*" }));
  koa.use(router.routes());

  koa.listen(port, hostname, () => {
    console.log(`HTTP Server running on http://${hostname}:${port}`);
  });
}
