import { db } from "../database";
import { type People } from "../schemas/people";

export function create(data: Omit<People, "id">) {
  return db
    .insertInto("people")
    .values(data)
    .returning(["id", "nome", "apelido", "nascimento", "stack"])
    .executeTakeFirst();
}

export function count() {
  return db
    .selectFrom("people")
    .select(({ fn }) => [
      fn.count<number>("id").as("total"),
    ])
    .executeTakeFirst();
}

export function search(t: string) {
  return db
    .selectFrom("people")
    .where("search", "~*", t)
    .select(["id", "nome", "apelido", "nascimento", "stack"])
    .limit(50)
    .execute();
}

export function getById(id: string) {
  return db
    .selectFrom("people")
    .where("id", "=", id)
    .select(["id", "nome", "apelido", "nascimento", "stack"])
    .executeTakeFirst();
}
