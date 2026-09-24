import { RENDERED_TOKEN } from "./constants";

export function checkAntibot({
  honeypot,
  rendered,
}: {
  honeypot: unknown;
  rendered: unknown;
}): "ok" | "bot" {
  if (honeypot !== undefined && honeypot !== null && String(honeypot) !== "") {
    return "bot";
  }

  if (rendered !== RENDERED_TOKEN) {
    return "bot";
  }

  return "ok";
}
