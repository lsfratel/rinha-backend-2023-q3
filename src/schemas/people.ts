import * as v from "valibot";
export { vValidator } from "@hono/valibot-validator";

export const schema = v.object({
  id: v.string([v.uuid()]),
  nome: v.string([v.maxLength(100)]),
  apelido: v.string([v.maxLength(32)]),
  nascimento: v.string([v.isoDate()]),
  stack: v.nullable(v.array(v.string([v.maxLength(32)]), [v.minLength(1)])),
});

export const searchSchema = v.object({
  t: v.string([v.minLength(1)]),
});

export type People = v.Output<typeof schema>;

export { v };
