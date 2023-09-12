import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import { Database } from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "rinhadb",
    user: "postgres",
    password: "postgres",
    host: "localhost",
    max: 3,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
