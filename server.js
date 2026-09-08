import { chmodSync, existsSync, unlinkSync } from "fs";
import { createServer } from "http";

process.env.NODE_ENV ||= "production";

const { default: next } = await import("next");

const target = process.env.PORT || "3000";
const isSocket = Number.isNaN(Number(target));
const dev = process.env.NODE_ENV === "development";

const app = next({ dev });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((req, res) => {
  handle(req, res);
});

if (isSocket) {
  if (existsSync(target)) {
    unlinkSync(target);
  }

  server.listen(target, () => {
    chmodSync(target, 0o777);
    console.log(`Server listening on socket ${target}`);
  });
} else {
  server.listen(Number(target), () => {
    console.log(`Server listening on http://localhost:${target}`);
  });
}
