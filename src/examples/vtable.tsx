import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackVTable() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.js"],
        bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
      }}
      customSetup={{
        dependencies: { "@visactor/vtable": "0.9.1-alpha.3" },
      }}
      files={{
        "/index.js": `import * as VTable from '@visactor/vtable'
const records = [
  {
    name: "燕子",
    introduction: "燕子是一种善于飞行的鸟类，通常栖息在房屋和建筑物的附近。",
    YoY: 10,
    QoQ: 10,
    trend: [
      { x: 1, y: 800 },
      { x: 2, y: 780 },
      { x: 3, y: 700 },
      { x: 4, y: 800 },
      { x: 5, y: 900 }
    ]
  },
  {
    name: "喜鹊",
    introduction:
      "喜鹊是一种常见的小型鸟类，主要分布在亚洲地区。它们体型较小，具有黑色的头部和喉咙、灰色的背部和白色的腹部。喜鹊是群居动物，常常在树林中或城市公园中筑巢繁殖，以昆虫、果实和种子为食。它们还具有很高的智商和社交性，被认为是一种聪明、有趣的鸟类。",
    YoY: -10,
    QoQ: -10,
    trend: [
      { x: 1, y: 500 },
      { x: 2, y: 680 },
      { x: 3, y: 400 },
      { x: 4, y: 600 },
      { x: 5, y: 800 }
    ]
  },
  {
    name: "孔雀",
    introduction:
      "孔雀是一种美丽的大型鸟类，拥有灿烂的蓝绿色羽毛和长长的尾羽。主要生活在南亚地区，以昆虫、水果和种子为食。",
    YoY: -10,
    QoQ: -10,
    trend: [
      { x: 1, y: 500 },
      { x: 2, y: 680 },
      { x: 3, y: 400 },
      { x: 4, y: 600 },
      { x: 5, y: 800 }
    ]
  }
];

const columns = [
  {
    field: "name",
    caption: "name",
    columnType: "link",
    templateLink: "https://www.google.com.hk/search?q={name}",
    linkJump: true,
    width: 100
  },
  {
    field: "introduction",
    caption: "introduction",
    columnType: "text",
    width: 200
  },
  {
    field: "YoY",
    caption: "count Year-over-Year",
    columnType: "progressbar",
    width: 200,
    fieldFormat() {
      return "";
    },
    barType: "negative",
    min: -20,
    max: 60,
    style: {
      barHeight: 20,
      barBottom: "30%"
    }
  },
  {
    field: "QoQ",
    caption: "count Quarter-over-Quarter",
    fieldFormat(rec) {
      return rec["QoQ"] + "%";
    },
    style: {
      textAlign: "center"
    },
    width: 150
  },
  {
    field: "trend",
    caption: "bird count",
    columnType: "sparkline",
    width: 300,
    sparklineSpec: {
      type: "line",
      xField: "x",
      yField: "y",
      pointShowRule: "none",
      smooth: true,
      line: {
        style: {
          stroke: "#2E62F1",
          strokeWidth: 2
        }
      },
      point: {
        hover: {
          stroke: "blue",
          strokeWidth: 1,
          fill: "red",
          shape: "circle",
          size: 4
        },
        style: {
          stroke: "red",
          strokeWidth: 1,
          fill: "yellow",
          shape: "circle",
          size: 2
        }
      },
      crosshair: {
        style: {
          stroke: "gray",
          strokeWidth: 1
        }
      }
    }
  }
];

const container = document.getElementById('main');
const option = {
  parentElement: container,
  records,
  columns,
};
const tableInstance = new VTable.ListTable(option);`,
        "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VTable</title>
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
