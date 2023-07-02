import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackVRender() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.js"],
        // bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
      }}
      customSetup={{
        dependencies: { "@visactor/vrender": "0.9.2-fill-stroke.10" },
      }}
      files={{
        "/index.js": `import { createStage, createArc, container, newThemeObj, defaultTicker, IGraphic } from '@visactor/vrender';

const graphics = [];
graphics.push(createArc({
  innerRadius: 60,
  outerRadius: 137.8,
  startAngle: -1.5707963267948966,
  endAngle: -0.3141592653589793,
  x: 100,
  y: 200,
  cornerRadius: 6,
  stroke: 'green',
  lineWidth: 2,
  cap: false
}));

const stage = createStage({
  // canvas: 'canvas',
  autoRender: true
  // container: document.get
});

graphics.forEach(g => {
  stage.defaultLayer.add(g);
})
`,
        "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VRender</title>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="main" style="width: 100vw;height:100vh;"><canvas id="canvas" /></div>
  </body>
</html>`,
      }}
      template="vanilla"
    />
  );
}
