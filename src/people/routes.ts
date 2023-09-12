import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import * as repo from "../repository/people";
import * as cache from "../repository/cache";
import { schema, searchSchema, v, vValidator } from "../schemas/people";

export const app = new Hono();

app.get(
  "/pessoas",
  vValidator(
    "query",
    searchSchema,
    (r, c) => {
      if (!r.success) {
        throw new HTTPException(400);
      }
    },
  ),
  async (c) => {
    const { t } = c.req.valid("query");
    return c.json(await repo.search(t), 200);
  },
);

app.post(
  "/pessoas",
  vValidator(
    "json",
    v.omit(schema, ["id"]),
    (r, c) => {
      if (!r.success) {
        throw new HTTPException(400);
      }
    },
  ),
  async (c) => {
    const body = c.req.valid("json");
    const { value } = await cache.get(body.apelido);
    if (value) {
      throw new HTTPException(422);
    }
    const people = await repo.create(body);
    await Promise.all([
      cache.set(people!.apelido, people),
      cache.set(people!.id, people),
    ]);
    return c.text(people!.id, 201, { "Location": `/pessoas/${people!.id}` });
  },
);

app.get(
  "/pessoas/:id",
  async (c) => {
    const { value } = await cache.get(c.req.param("id"));
    if (value) {
      return c.text(value.toString("utf8"), 200, {
        "content-type": "application/json",
      });
    }
    const people = await repo.getById(c.req.param("id"));
    if (!people) {
      throw new HTTPException(404);
    }
    return c.json(people);
  },
);

app.get(
  "/contagem-pessoas",
  async (c) => {
    const result = await repo.count();
    return c.text(String(result?.total));
  },
);
