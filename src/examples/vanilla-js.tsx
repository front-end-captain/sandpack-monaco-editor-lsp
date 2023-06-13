import { SandpackTypescript } from "../sandpack-ts";

export function SandpackVanillaJs() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.ts"],
        bundlerURL: "http://localhost:1234/",
      }}
      files={{
        "/index.js": `const container = document.getElementById('container');
container.innerHTML = '<h1>hello world</h1>';
`,
        "/public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
    <style>
      html, body {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="container" style="width: 100vw;height:100vh;"></div>
  </body>
</html>`,
      }}
      template="vanilla"
    />
  );
}
