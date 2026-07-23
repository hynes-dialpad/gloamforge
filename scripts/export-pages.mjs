import { writeFile } from "node:fs/promises";

const outputRoot = new URL("../dist/client/", import.meta.url);

function getGitHubPagesUrl() {
  const repository = process.env.GITHUB_REPOSITORY;
  if (!repository) return null;

  const [owner, name] = repository.split("/");
  if (!owner || !name) return null;

  const isAccountSite = name.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  const path = isAccountSite ? "/" : `/${name}/`;
  return `https://${owner}.github.io${path}`;
}

async function renderHomePage() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("export", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://gloamforge.local/", {
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

  if (!response.ok) {
    throw new Error(`Static render failed with status ${response.status}`);
  }

  return response.text();
}

const pagesUrl = getGitHubPagesUrl();
const socialImageUrl = pagesUrl ? new URL("og.png", pagesUrl).href : "./og.png";
let html = await renderHomePage();

html = html
  .replaceAll("/assets/", "./assets/")
  .replaceAll("/favicon.svg", "./favicon.svg")
  .replaceAll('content="/og.png"', `content="${socialImageUrl}"`);

await Promise.all([
  writeFile(new URL("index.html", outputRoot), html),
  writeFile(new URL("404.html", outputRoot), html),
  writeFile(new URL(".nojekyll", outputRoot), ""),
]);

console.log(`Exported Gloamforge for GitHub Pages${pagesUrl ? ` at ${pagesUrl}` : ""}.`);
