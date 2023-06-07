import { SandpackTypescript } from "../sandpack-ts";
export function SandpackEcharts() {
  return (
    <SandpackTypescript
      customSetup={{
        dependencies: { echarts: "5.4.2", "@types/echarts": "4.9.18" },
      }}
      files={{
        "/index.ts": `import * as echarts from 'echarts';

const myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
        `,
        "/index.html": `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="main" style="width: 600px;height:300px;"></div>
  </body>
</html>`,
      }}
      template="vanilla-ts"
    />
  );
}
