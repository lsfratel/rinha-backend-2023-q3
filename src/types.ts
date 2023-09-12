import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export type Database = {
  people: PeopleTable
}

export type PeopleTable = {
  id: Generated<string>
  nome: string
  apelido: string
  nascimento: string
  stack: string[] | null
  search: Generated<string>
}
