CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION immutable_array_to_string(text[])
RETURNS TEXT AS $$
  SELECT array_to_string($1, ' ');
$$ LANGUAGE sql IMMUTABLE;

CREATE TABLE IF NOT EXISTS "people" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "nome" VARCHAR(100) NOT NULL,
  "apelido" VARCHAR(32) NOT NULL UNIQUE,
  "nascimento" CHAR(10) NOT NULL,
  "stack" TEXT[],
  "search" TEXT NOT NULL GENERATED ALWAYS AS (
    "nome" || ' ' || "apelido" || ' ' || COALESCE(immutable_array_to_string("stack"), '')
  ) STORED
);

CREATE INDEX IF NOT EXISTS "idx_people_trgm" ON "people" USING GIST ("search" GIST_TRGM_OPS);
