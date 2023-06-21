import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackReact() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/App.jsx"],
        bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
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
