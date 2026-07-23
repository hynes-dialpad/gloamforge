import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the three-mission Gloamforge course", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Gloamforge \| A Blender field guide<\/title>/i);
  assert.match(html, /<link[^>]+rel="icon"[^>]+href="\/favicon\.svg"/i);
  assert.match(html, /<main\b/i);
  assert.match(html, /<h1[^>]*>[\s\S]*?Gloamforge[\s\S]*?<\/h1>/i);
  assert.match(html, /Ready the Forge/);
  assert.match(html, /Shape the Warden/);
  assert.match(html, /Light the Oath/);
  assert.match(html, /Blender 4\.5 LTS/);
  assert.match(html, /15-30 minutes/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("keeps the course original and focused on the requested learning path", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Build characters\. Light worlds\. Tell stories\./);
  assert.match(html, /MacBook/i);
  assert.match(html, /trackpad/i);
  assert.match(html, /progress is saved on this device/i);
  assert.doesNotMatch(html, /Warhammer|Mistborn/i);
});

test("exports a self-contained GitHub Pages entry point", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Gloamforge \| A Blender field guide<\/title>/i);
  assert.match(html, /href="\.\/assets\//);
  assert.doesNotMatch(html, /(?<!\.)\/assets\//);
  assert.match(html, /href="\.\/favicon\.svg"/);
  assert.match(html, /<meta property="og:image" content="(?:https:\/\/[^\"]+\/|\.\/)og\.png"/i);
});
