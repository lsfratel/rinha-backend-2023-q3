import { Client } from "memjs";

const cache = Client.create();

export function get(key: string) {
  return cache.get(key);
}

export function set(key: string, obj: any, expires = 5 * 60) {
  return cache.set(key, JSON.stringify(obj), { expires });
}
