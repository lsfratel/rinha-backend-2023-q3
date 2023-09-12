import bootstrapApp from "./bootstrap";

const app = bootstrapApp();

Bun.serve({
  port: process.env.PORT!,
  fetch: app.fetch,
});
