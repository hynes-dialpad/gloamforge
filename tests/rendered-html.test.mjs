import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
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
  assert.match(
    html,
    /class="brandMark"[^>]*>[\s\S]*?<svg[^>]+viewBox="0 0 48 48"[\s\S]*?class="brandHelm"/i,
  );
  assert.match(html, /<main\b/i);
  assert.match(html, /<h1[^>]*>[\s\S]*?Gloamforge[\s\S]*?<\/h1>/i);
  assert.match(html, /Ready the Forge/);
  assert.match(html, /Shape the Warden/);
  assert.match(html, /Light the Oath/);
  for (const phaseTitle of [
    "Name your version",
    "Circle the default cube",
    "Stack a relic marker",
    "Bank the ember",
  ]) {
    assert.match(html, new RegExp(phaseTitle));
  }
  assert.match(html, /Blender 4\.5 LTS/);
  assert.match(html, /15-30 minutes/);
  assert.match(html, /A field kit for the MacBook/);
  assert.equal(
    html.match(/Reset progress/g)?.length,
    2,
    "expected reset access in both the masthead and footer",
  );
  assert.match(html, /gatewarden-hero\.png/);
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

test("server-renders one active mission phase with accessible disclosure state", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(
    html,
    /<button[^>]+aria-expanded="true"[^>]*>[\s\S]*?Name your version[\s\S]*?<\/button>/i,
  );
  assert.match(
    html,
    /<button[^>]+aria-expanded="false"[^>]*>[\s\S]*?Circle the default cube[\s\S]*?<\/button>/i,
  );
  assert.match(
    html,
    /id="phase-panel-forge-navigation"[^>]+hidden=""/i,
  );
  assert.match(html, /aria-label="Mission I progress"/i);
});

test("renders the full artwork policy and timer-free mission entry contract", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(
    html,
    /<a[^>]+class="primaryButton"[^>]+href="#active-mission"/i,
  );
  assert.match(
    html,
    /<img[^>]+src="\.\/gatewarden-hero\.png"[^>]+width="1200"[^>]+height="630"[^>]+loading="eager"/i,
  );
  assert.match(
    html,
    /<img[^>]+src="\.\/gatewarden-ready\.png"[^>]+width="1200"[^>]+height="800"[^>]+loading="lazy"/i,
  );

  const assetsUrl = new URL("../dist/client/assets/", import.meta.url);
  const assetNames = await readdir(assetsUrl);
  const clientJavaScript = (
    await Promise.all(
      assetNames
        .filter((name) => name.endsWith(".js"))
        .map((name) => readFile(new URL(name, assetsUrl), "utf8")),
    )
  ).join("\n");
  for (const artwork of [
    "./gatewarden-ready.png",
    "./gatewarden-shape.png",
    "./gatewarden-oath.png",
  ]) {
    assert.match(clientJavaScript, new RegExp(artwork.replace(".", "\\.")));
  }

  const courseSource = await readFile(
    new URL("../app/components/gloamforge-course.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(courseSource, /\bsetTimeout\s*\(/);
  assert.match(
    courseSource,
    /const entryMissionId\s*=\s*completedStepIds\.length === 0\s*\?\s*missions\[0\]\.id\s*:\s*activeMissionId;/s,
  );
  assert.match(courseSource, /selectMission\(entryMissionId,\s*true\);/);
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
  assert.doesNotMatch(html, /(?<!\.)\/favicon\.svg/);
  assert.doesNotMatch(html, /fonts\.googleapis\.com/i);
  assert.match(html, /<meta property="og:image" content="(?:https:\/\/[^\"]+\/|\.\/)og\.png"/i);

  const [, stylesheetFile] =
    html.match(/href="\.\/assets\/([^\"]+\.css)"/) ?? [];
  assert.ok(stylesheetFile, "expected the exported page to identify its stylesheet");
  const stylesheet = await readFile(
    new URL(`../dist/client/assets/${stylesheetFile}`, import.meta.url),
    "utf8",
  );
  assert.match(stylesheet, /font-family:Marcellus/);
  assert.match(stylesheet, /font-family:"Source Sans 3"/);
  assert.match(stylesheet, /url\(\.\/marcellus-400-[^)]+\.ttf\)/);
  assert.match(stylesheet, /url\(\.\/source-sans-3-400-[^)]+\.ttf\)/);

  const [, entryFile] = html.match(/import\("\.\/assets\/([^\"]+\.js)"\)/) ?? [];
  assert.ok(entryFile, "expected the exported page to identify its client entry");
  const entry = await readFile(
    new URL(`../dist/client/assets/${entryFile}`, import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(entry, /function\([^)]*\)\{return`\/`\+/);
});
