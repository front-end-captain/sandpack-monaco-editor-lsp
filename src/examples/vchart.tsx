import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackVChart() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.js"],
        bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
      }}
      customSetup={{
        dependencies: { "@visactor/vchart": "0.0.1-alpha.1" },
      }}
      files={{
        "/index.js": `import VChart from '@visactor/vchart';
const spec = {
  type: "common",
  data: {
    values: [
      {
        time: "2:00",
        value: 8,
        type: "TikTok",
      },
      {
        time: "4:00",
        value: 9,
        type: "TikTok",
      },
      {
        time: "6:00",
        value: 11,
        type: "TikTok",
      },
      {
        time: "8:00",
        value: 14,
        type: "TikTok",
      },
      {
        time: "10:00",
        value: 16,
        type: "TikTok",
      }
    ],
  },
  color: ["#6690F2", "#70D6A3"],
  series: [
    {
      type: "bar",
      xField: "time",
      yField: "value",
      stack: true,
      seriesField: "type",
    },
  ],
  legends: {
    visible: true,
    orient: "right",
  },
  axes: [
    {
      orient: "bottom",
      type: "band",
    },
    {
      orient: "left",
      type: "linear",
    },
  ],
};
const container = document.getElementById('main');
const vChart = new VChart(spec, { dom: container }).renderSync();`,
        "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VChart</title>
  </head>
  <body>
    <div id="main" style="width: 600px;height:300px;"></div>
  </body>
</html>`,
      }}
      template="vanilla"
    />
  );
}
