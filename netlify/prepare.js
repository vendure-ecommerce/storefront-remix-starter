import * as fsp from "node:fs/promises";

await fsp
  .rm(".netlify/functions-internal", { recursive: true })
  .catch(() => {});
await fsp.mkdir(".netlify/functions-internal", { recursive: true });
await fsp.cp("build/server/", ".netlify/functions-internal/handler", {
  recursive: true,
});

// .netlify/functions-internal
