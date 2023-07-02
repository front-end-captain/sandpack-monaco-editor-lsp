import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackVGrammar() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.js"],
        // bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
      }}
      customSetup={{
        dependencies: { "@visactor/vgrammar": "0.0.11-alpha.8" },
      }}
      files={{
        "/index.js": `import * as VGrammar from '@visactor/vgrammar'
VGrammar.registerBoxplotGlyph();

const spec = {
  width: 800,
  height: 400,
  padding: { top: 30, right: 40, bottom: 30, left: 40 },

  data: [
    {
      id: 'table',
      values: [
        {
          test: 'test0',
          value1: 1600,
          value2: 1200,
          value3: 800,
          value4: 700,
          value5: 500
        },
        {
          test: 'test1',
          value1: 1900,
          value2: 1000,
          value3: 400,
          value4: 300,
          value5: 100
        },
        {
          test: 'test2',
          value1: 1300,
          value2: 1200,
          value3: 200,
          value4: -100,
          value5: -500
        },
        {
          test: 'test3',
          value1: 1400,
          value2: 1000,
          value3: 900,
          value4: 800,
          value5: 500
        },
        {
          test: 'test4',
          value1: 1200,
          value2: 500,
          value3: 400,
          value4: -100,
          value5: -400
        },
        {
          test: 'test5',
          value1: 1400,
          value2: 1000,
          value3: 900,
          value4: 700,
          value5: 300
        }
      ]
    }
  ],

  scales: [
    {
      id: 'xScale',
      type: 'point',
      domain: { data: 'table', field: 'test' },
      dependency: ['viewBox'],
      range: (scale, params) => {
        return [params.viewBox.x1, params.viewBox.x2];
      },
      padding: 0.5,
      round: true
    },
    {
      id: 'yScale',
      type: 'linear',
      domain: { data: 'table', field: ['value1', 'value2', 'value3', 'value4', 'value5'] },
      dependency: ['viewBox'],
      range: (scale, params) => {
        return [params.viewBox.y2, params.viewBox.y1];
      },
      zero: true
    },
    // {
    //   id: 'colorScale',
    //   type: 'ordinal',
    //   domain: { data: 'table', field: 'test' },
    //   range: colorSchemeForLight
    // }
  ],

  marks: [
    {
      type: 'component',
      componentType: 'crosshair',
      scale: 'xScale',
      crosshairShape: 'rect',
      crosshairType: 'x',
      encode: {
        update: (datum, element, params) => {
          return {
            start: { y: params.viewBox.x1 },
            end: { y: params.viewBox.y2 }
          };
        }
      },
      dependency: ['viewBox']
    },
    {
      type: 'component',
      componentType: 'axis',
      scale: 'yScale',
      tickCount: 5,
      encode: {
        update: (datum, element, params) => {
          return {
            x: params.viewBox.x1,
            y: params.viewBox.y2,
            start: { x: 0, y: 0 },
            end: { x: 0, y: -params.viewBox.height() },
            verticalFactor: -1
          };
        }
      },
      dependency: ['viewBox']
    },
    {
      type: 'component',
      componentType: 'axis',
      scale: 'xScale',
      encode: {
        update: (datum, element, params) => {
          return {
            x: params.viewBox.x1,
            y: params.viewBox.y2,
            start: { x: 0, y: 0 },
            end: { x: params.viewBox.width(), y: 0 }
          };
        }
      },
      dependency: ['viewBox']
    },
    {
      type: 'glyph',
      from: { data: 'table' },
      glyphType: 'boxplot',
      encode: {
        update: {
          x: { scale: 'xScale', field: 'test' },
          max: { scale: 'yScale', field: 'value1' },
          q3: { scale: 'yScale', field: 'value2' },
          median: { scale: 'yScale', field: 'value3' },
          q1: { scale: 'yScale', field: 'value4' },
          min: { scale: 'yScale', field: 'value5' },

          boxWidth: 60,
          ruleWidth: 40,

          stroke: 'black',
          fill: { scale: 'colorScale', field: 'test' },
          opacity: 1
        },
        hover: {
          opacity: 0.7
        }
      },
      animation: {
        enter: {
          type: 'boxplotScaleIn',
          duration: 1000
        },
        state: {
          duration: 500
        }
      }
    }
  ]
};

const container = document.getElementById('main');
const vGrammarView = new VGrammar.View({
  width: spec.width,
  height: spec.height,
  container: container,
  hover: true
});
vGrammarView.parseSpec(spec);
vGrammarView.runAsync();
`,
        "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VGrammar</title>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="main" style="width: 100vw;height:100vh;"></div>
  </body>
</html>`,
      }}
      template="vanilla"
    />
  );
}
