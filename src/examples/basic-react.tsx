import { SandpackTypescript } from "../sandpack-ts";

export function SandpackReact() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.ts"],
        bundlerURL: "http://localhost:1234/",
      }}
      files={{
        "/App.jsx": `import React from "react"

export default function App() {
  return <div><h2>Hello world!</h2></div>;
}`,
      }}
      template="react"
    />
  );
}
