import { Hono } from "hono";
import { peopleRoutes } from "./people";

export default () => {
  const app = new Hono();
  app.route("/", peopleRoutes);

  return app;
};
