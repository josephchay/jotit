import { now } from "./date";

export function id() {
  return now() + "" + Math.floor(Math.random() * 80);
}
