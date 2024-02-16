// Current no good way to define an enum in JavaScript ECMAScript 6 (at least not when using WebStorm v2023.2.4)
export const Actions = Object.freeze({
  IDLE: "idle",
  FRESH: "fresh",
  EJECTING: "ejecting",
  THRASHING: "thrashing",
});
