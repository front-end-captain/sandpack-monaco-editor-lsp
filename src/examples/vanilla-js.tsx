import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackVanillaJs() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.js"],
        bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
      }}
      files={{
        "/index.js": `export function run() {
  const container = document.getElementById('container');
    container.innerHTML = '<h1>hello</h1>';
  };
run();`,
        "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VanillaJS</title>
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
